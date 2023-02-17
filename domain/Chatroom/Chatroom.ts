import { Unsubscribe } from "firebase/auth";
import { DocumentSnapshot } from "firebase/firestore";
import { ChatroomDto, CHAT_STATE, CHAT_STATE_PUBLIC, MessageDto } from "infrastructure/dto/amas.dto";
import amasRepository from "infrastructure/repositories/amas.repository";

export class Chatroom {
  title:string 
  excerpt?: string 
  thumb?:any 
  id:string
  state_chat?: CHAT_STATE_PUBLIC
  state?: CHAT_STATE 
  interviewee:{
    fullname: string,
    uid: string
  }
  constructor(data:ChatroomDto){
    this.title = data.title
    this.excerpt = data.excerpt
    this.thumb = data.thumb
    this.id = data.id as string
    this.state_chat = data.state_chat
    this.state = data.state
    this.interviewee = data.interviewee
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
}