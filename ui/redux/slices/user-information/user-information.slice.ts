import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotificationDto } from "infrastructure/dto/notification.dto";
import notificationRepository from "infrastructure/repositories/notification.repository";
import { UserRepositoryImplInstance } from "infrastructure/repositories/users.repository";

export interface  USER_INFORMATION_STATE {
  queryResultNoti: {error: any, noti: Array<NotificationDto>, lastNoti?:any}
  queryResultInvoice: {error: any, invoices: Array<NotificationDto>}
  loading: boolean
}

const initialState: USER_INFORMATION_STATE = { loading: false, queryResultNoti : {error: null, noti: [] }, queryResultInvoice : {error: null, invoices: [] }};

export const getNotifications = createAsyncThunk(
  'userInformation@notifications',
  async (query: {uid:string, last?:any}) => {
    try {
      const response = await notificationRepository.get(query.uid as string, query.last)
      return response
    } catch (error) {
      return {error, items: []};
    }
  }
)

export const deleteNotifications = createAsyncThunk(
  'userInformation@deletenotifications',
  async (n_id:string) => {
    try {
      await notificationRepository.delete(n_id)
      return n_id
    } catch (error) {
      return {error, items: []};
    }
  }
)

export const getInvoices = createAsyncThunk(
  'userInformation@getInvoices',
  async (email:string) => {
    try {
      const response = await UserRepositoryImplInstance.getInvoices(email)
      return response
    } catch (error) {
      return {error, items: []};
    }
  }
)

export const userInformation = createSlice({
  name: 'UserInformation',
  initialState,
  reducers: {
    cleanNoti: (state) => {
      state.queryResultNoti = {error: null, noti: []};
      state.loading = false;
    },
    cleanInvoices: (state) => {
      state.queryResultInvoice = {error: null, invoices: []};
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers : (builder) => {
    builder
    .addCase(getNotifications.pending, (state) => { state.loading = true })
    .addCase(getNotifications.fulfilled, (state: any, action: any)=>{ 
      state.loading = false; 
      const {error, items, lastSnap} = action.payload
      const currentItems = state.queryResultNoti.noti
      const last = lastSnap
      
      if(!error)
        state.queryResultNoti ={error: null, noti: items, lastNoti : last } 
    })
    .addCase(deleteNotifications.fulfilled, (state: any, action: any)=>{ 
      state.loading = false; 
      const n_id = action.payload;
      const toDelete = state.queryResultNoti.noti.findIndex((item: NotificationDto) => item.id === n_id)
      state.queryResultNoti.noti.splice(toDelete, 1)
    })
    .addCase(getInvoices.pending, (state) => { state.loading = true })
    .addCase(getInvoices.fulfilled, (state: any, action: any)=>{ 
      state.loading = false; 
      const {error, items} = action.payload
      const currentItems = state.queryResultInvoice.invoices
      if(!error)
        state.queryResultInvoice ={error: null, invoices: [...currentItems, ...items]} 
    })
  }
})

//Estrallendo actions
export const { cleanNoti, setLoading, cleanInvoices } = userInformation.actions;

export default userInformation.reducer