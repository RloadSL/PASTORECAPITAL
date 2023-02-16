import { Unsubscribe } from "firebase/auth";
import { ChatroomDto, CHAT_STATE, CHAT_STATE_PUBLIC } from "infrastructure/dto/amas.dto";
import amasRepository from "infrastructure/repositories/amas.repository";

export class Chatroom {
  title:string 
  excerpt?: string 
  thumb?:any 
  id:string
  state_chat?: CHAT_STATE_PUBLIC
  state?: CHAT_STATE 

  constructor(data:ChatroomDto){
    this.title = data.title
    this.excerpt = data.excerpt
    this.thumb = data.thumb
    this.id = data.id as string
    this.state_chat = data.state_chat
    this.state = data.state
  }

  /**
   * Se suscribe a los cambios de la subcoleccion de mensajes en esta sala y retorna el unsubscribe
   */
  openChatroom(callback: Function):Unsubscribe{
    return amasRepository.onChangeChatRoom(this.id as string, callback)
  }
}