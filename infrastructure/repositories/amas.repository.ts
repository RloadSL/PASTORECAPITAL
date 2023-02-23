import { Chatroom } from "domain/Chatroom/Chatroom";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { DocumentSnapshot, Unsubscribe } from "firebase/firestore";
import { ChatroomDto, MessageDto } from "infrastructure/dto/amas.dto";
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
        const res = await FireFirestore.createDoc('amas', {...data, state: 'active', state_chat:'private'})
        return res;
      }
    } catch (error) {
      return error;
    }
  }

  async getChatRooms(lastSnap?:DocumentSnapshot){
    const ref = await FireFirestore.getCollectionDocs('amas', lastSnap, undefined, 20)
    if( !(ref instanceof ErrorApp) && ref.length > 0){
      return ref.map(doc => new Chatroom({id: doc.id, ...(doc.data() as ChatroomDto)}))
    }else{
      return ref
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
    })
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