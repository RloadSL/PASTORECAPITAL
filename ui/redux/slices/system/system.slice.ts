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
    setLoading: (state) => {
      state.loading = !state.loading;
    }
  }
})

//Estrallendo actions
export const { cleanErrors, setLoading } = system.actions;

export default system.reducer