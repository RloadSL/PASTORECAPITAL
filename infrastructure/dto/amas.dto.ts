export type CHAT_STATE = 'active' | 'closed' 
export type CHAT_STATE_PUBLIC = 'public' | 'closed' 

export interface ChatroomDto {
  title:string, 
  excerpt?: string, 
  thumb?:any, 
  id?:string,
  state_chat?: CHAT_STATE_PUBLIC,
  state?: CHAT_STATE 

}