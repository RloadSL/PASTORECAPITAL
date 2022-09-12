import { createSlice } from "@reduxjs/toolkit";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";

const initialState: {
  errorApp: ErrorApp[],
  loading: boolean
} = {  errorApp : [], loading: false };

export const system = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    cleanErrors: (state) => {
      console.log('CLEAN ERROR')
      state.errorApp = [];
    },
    pushError: (state, action) => {
      if(!state.errorApp.find(err => err.errorCode === action.payload.errorCode)){
        state.errorApp = [action.payload,...state.errorApp];
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
})

//Estrallendo actions
export const { cleanErrors, setLoading, pushError } = system.actions;

export default system.reducer