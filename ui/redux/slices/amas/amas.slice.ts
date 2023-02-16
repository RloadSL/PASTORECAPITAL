import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Chatroom } from "domain/Chatroom/Chatroom";
import { NotificationDto } from "infrastructure/dto/notification.dto";
import notificationRepository from "infrastructure/repositories/notification.repository";
import { UserRepositoryImplInstance } from "infrastructure/repositories/users.repository";

export interface  USER_INFORMATION_STATE {
  messages: Array<any>
  chatroom?: Chatroom
  last:any
  loading: boolean
}

const initialState: USER_INFORMATION_STATE = { loading: false, messages: [], last: undefined};



export const amasReducer = createSlice({
  name: 'UserInformation',
  initialState,
  reducers: {
    cleanNoti: (state) => {
      state.last = undefined;
      state.messages = []
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setChatrommMessages: (state, action) =>{
      const {messages, last} = action.payload;
      state = {...state, messages, last}
    },
    setChatroom: (state, action) =>{
      state.chatroom = action.payload;
    }
  },
  
})

//Estrallendo actions
export const { cleanNoti, setLoading, setChatrommMessages, setChatroom } = amasReducer.actions;

export default amasReducer.reducer