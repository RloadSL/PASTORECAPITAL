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
  },
  extraReducers: (builder) => {
    
  }
})

//Estrallendo actions
export const {} = system.actions;

export default system.reducer