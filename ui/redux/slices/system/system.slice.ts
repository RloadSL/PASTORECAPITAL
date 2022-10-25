import { createSlice } from "@reduxjs/toolkit";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { InfoApp } from "domain/InfoApp/InfoApp";

const initialState: {
  errorApp: ErrorApp[],
  infoApp: InfoApp[],
  loading: boolean
} = {  errorApp : [], loading: true, infoApp: [] };

export const system = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    clean: (state) => {
      console.log('CLEAN ERROR')
      state.errorApp = [];
      state.infoApp = [];
    },
    pushError: (state, action) => {
      if(!state.errorApp.find(err => err.errorCode === action.payload.errorCode)){
        state.errorApp = [action.payload,...state.errorApp];
      }
    },
    pushInfo: (state, action) => {
      if(!state.infoApp.find((info:any) => info.code === action.payload.code)){
        state.infoApp = [action.payload,...state.infoApp];
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
})

//Estrallendo actions
export const { clean, setLoading, pushError, pushInfo } = system.actions;

export default system.reducer