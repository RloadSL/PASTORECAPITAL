import { Chatroom } from "domain/Chatroom/Chatroom";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import Translate from "domain/Translate/Translate";
import { DocumentSnapshot, Unsubscribe } from "firebase/firestore";
import { ChatroomDto, MessageDto } from "infrastructure/dto/amas.dto";
import { elasticSearch, ELASTIC_QUERY } from "infrastructure/elasticsearch/search.elastic";
import storageFirebase from "infrastructure/firebase/storage.firebase";
import { identity } from "lodash";
import { string } from "yup";
import FireFirestore from "../firebase/firestore.firebase";

class AmasRepository{
  private static instance: AmasRepository;
  private constructor() { };

  public static getInstance(): AmasRepository {
    if (!AmasRepository.instance) {
      AmasRepository.instance = new AmasRepository();
    }
    return AmasRepository.instance;
  }
  /**
   * Genera una sala de entrevista si no existe data.id o modifica la sala si existe el id.
   * @param data 
   * @returns 
   */
  async setChatroom(data:ChatroomDto){
    const lang = Translate.currentLocal
    try {
      if(data.thumb instanceof File){
        const thumbUri = await storageFirebase.UploadFile(`amas/{${data.title?.replace(/' '/g, '_')}}`, data.thumb)
        data.thumb = {
          created_at: new Date(),
          url : thumbUri
        }
      }
     
      if(data.id){
        await FireFirestore.setDoc('amas', data.id, data)
        return data.id;
      }else{
        delete data.id;
        const res = await FireFirestore.createDoc('amas', {...data, lang, state: 'coming_soon', state_chat:'private'})
        return res.id;
      }
    } catch (error) {
      return error;
    }
  }

  onSnapDoc(id:string, callback:Function){
    return FireFirestore.onChangeDoc('amas/'+id, callback)
  }

  parseDataFromElastic(results:any[]):Chatroom[]{
    return results.map((items:any) => {
      const data:ChatroomDto = {
        title: items.title.raw, 
        excerpt: items.excerpt.raw, 
        lang :items.lang.raw,
        id:items.id.raw,
        created_at: new Date(items.created_at.raw),
        state_chat :  items.state_chat.raw,
        state: items.state.raw,
        interviewee: JSON.parse(items.interviewee.raw) ,
      }
      if(items.thumb ){
        data.thumb =  JSON.parse(items.thumb.raw)
      }
      return new Chatroom(data);
    })
  }

  async getChatRooms(query: ELASTIC_QUERY): Promise<{ results: Chatroom[], page: any }> {
    const lang = Translate.currentLocal
    query.sort = {"created_at": "desc"}
    query.filters = {all: [query.filters, {lang}]}
    const elasticRes = await elasticSearch('amas', query)
    const page = elasticRes.data.meta.page;
    let results = elasticRes.data.results

    if (!results) {
      return { results: [], page: null }
    } else {
      return { results: this.parseDataFromElastic(results), page }
    }
  }

    getChatroom = async (chatroom_id:string)=>{
    const ref = await FireFirestore.getDoc('amas', chatroom_id)
    if(!(ref instanceof ErrorApp)){
      return new Chatroom({id: ref?.id, ...ref?.data()} as ChatroomDto)
    }else{
      return ref
    }
  }

  async createEnterChat(data: MessageDto){
    const res = await FireFirestore.createDoc(`amas/${data.chatroom_id}/messages`, data)
    return res;
  }

  async getChatMessages(chatroom_id:string,last: DocumentSnapshot){
    const ref = await FireFirestore.getCollectionDocs(`amas/${chatroom_id}/messages`,last)
    if(!(ref instanceof ErrorApp))
      return {items : ref.map(doc => ({id: doc.id, ...doc.data()})), last: ref.pop()};
    else return {items: []}
  }

  async deleteEnterChat(chatroom_id: string,message_id: string){
    const res = await FireFirestore.deleteDoc(`amas/${chatroom_id}/messages`, message_id)
    return res;
  }

  onChangeChatRoom(chatroom_id:string,callback:Function): Unsubscribe {
    return FireFirestore.onChangeCollection(`amas/${chatroom_id}/messages`,(data:any)=>{
      callback(data);
    }, undefined, 100)
  };

  onChangeRoom(chatroom_id:string,callback:Function): Unsubscribe {
    return FireFirestore.onChangeDoc(`amas/${chatroom_id}`,(data:any)=>{
      callback(data);
    })
  };

  async downloadPdfChat(ch_name:string){
    const path = `amas/chatroom/${ch_name}.pdf`
    const url = await storageFirebase.getDownloadLink(path)
    return url;
  }
}




export default AmasRepository.getInstance()