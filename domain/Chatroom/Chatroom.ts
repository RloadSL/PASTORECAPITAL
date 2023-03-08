import { Unsubscribe } from "firebase/auth";
import { DocumentSnapshot } from "firebase/firestore";
import { ChatroomDto, CHAT_STATE, CHAT_STATE_PUBLIC, MessageDto } from "infrastructure/dto/amas.dto";
import amasRepository from "infrastructure/repositories/amas.repository";

export class Chatroom {
  title:string 
  excerpt?: string 
  thumb?:any 
  created_at?:Date
  id:string
  /**
   * Estado del chat para los usuarios invitados si puedes escribir o no como invitado.
   */
  state_chat?: CHAT_STATE_PUBLIC
  /**
   * Estado de la sala cerrada o abierta 
   */
  state?: CHAT_STATE 
  /**
   * Entrevistado en la sala
   */
  interviewee:{
    fullname: string,
    uid: string
  }
  constructor(data:ChatroomDto){
    this.title = data.title as string
    this.excerpt = data.excerpt
    this.thumb = data.thumb
    this.id = data.id as string
    this.state_chat = data.state_chat
    this.state = data.state
    this.interviewee = data.interviewee as any
    this.created_at = data.created_at instanceof Date ? data.created_at : data.created_at.toDate()
  }

  setChatroom(data:any){
    return amasRepository.setChatroom({...data, id: this.id})
  }

    /**
   * Se suscribe a los cambios de la subcoleccion de mensajes en esta sala y retorna el unsubscribe
   */
    listenChatrooom(callback: Function):Unsubscribe{
      return amasRepository.onChangeRoom(this.id as string, callback)
    }
  

  /**
   * Se suscribe a los cambios de la subcoleccion de mensajes en esta sala y retorna el unsubscribe
   */
  openChatroom(callback: Function):Unsubscribe{
    return amasRepository.onChangeChatRoom(this.id as string, callback)
  }

  async getChatroomMessages(last:DocumentSnapshot){
    const res = await amasRepository.getChatMessages(this.id, last)
    return res;
  }

  async pushMessage(message:MessageDto): Promise<void>{
    await amasRepository.createEnterChat(message)
  }

  async deleteMessage(message_id:string): Promise<void>{
    await amasRepository.deleteEnterChat(this.id, message_id)
  }
  
  async closeChatroom(){
    await amasRepository.setChatroom({state: 'closed', id: this.id})
  }

  async downloadPDF(){
    if(this.state == 'closed'){
      const url =  amasRepository.downloadPdfChat(this.title);
      return url;
    }
  }
}