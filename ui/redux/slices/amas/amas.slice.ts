import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Chatroom } from "domain/Chatroom/Chatroom";
import { NotificationDto } from "infrastructure/dto/notification.dto";
import notificationRepository from "infrastructure/repositories/notification.repository";
import { UserRepositoryImplInstance } from "infrastructure/repositories/users.repository";

export interface  USER_INFORMATION_STATE {
  messages?: Array<any>
  chatroom?: Chatroom
  last:any
  loading: boolean
}

const initialState: USER_INFORMATION_STATE = { loading: false, messages: undefined, last: undefined};



export const amasReducer = createSlice({
  name: 'UserInformation',
  initialState,
  reducers: {
    cleanMessages: (state) => {
      state.last = undefined;
      state.messages = undefined
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setChatrommMessages: (state, action) =>{
      const {messages, last} = action.payload;
      state.messages = messages;
      state.last = last

    },
    setChatroom: (state, action) =>{
      state.chatroom = action.payload;
    }
  },
  
})

//Estrallendo actions
export const { cleanMessages, setLoading, setChatrommMessages, setChatroom } = amasReducer.actions;

export default amasReducer.reducer