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
      state.errorApp = [];
    },
    pushError: (state, action) => {
      state.errorApp = [action.payload,...state.errorApp];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
})

//Estrallendo actions
export const { cleanErrors, setLoading } = system.actions;

export default system.reducer