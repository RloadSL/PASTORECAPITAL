export type CHAT_STATE = 'active' | 'closed' 
export type CHAT_STATE_PUBLIC = 'public' | 'closed' 

export interface ChatroomDto {
  title:string, 
  excerpt?: string, 
  thumb?:any, 
  id?:string,
  state_chat?: CHAT_STATE_PUBLIC,
  state?: CHAT_STATE 
  interviewee: {
    fullname:string,
    uid: string
  }
}

export interface MessageDto{
  id?: string
  created_at?: Date,
  message: string,
  owner: {
    fullname: string,
    uid: string
  },
  ref?: {
    title: string,
    message_id: string
  },
  chatroom_id: string
}