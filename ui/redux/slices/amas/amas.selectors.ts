import { Chatroom } from "domain/Chatroom/Chatroom";

export const getOpenChatroom = (state:any):Chatroom =>  {
  const chatroom = state.amas.chatroom;
  return chatroom;
}; 

export const getMessages = (state:any) =>  {
  const messages:any = state.amas.messages;
  return messages;
};  

export const getLastMessages = (state:any) =>  {
  const last:any = state.amas.last;
  return last;
}; 

export const getAmasLoading = (state:any):boolean =>  {
  const loading = state.amas.loading;
  return loading;
}; 