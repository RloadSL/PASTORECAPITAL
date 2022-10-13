import { createSlice } from "@reduxjs/toolkit";
import { Comments } from "domain/Comments/comments";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";

const initialState: {
  comments: Comments[],
  loading: boolean
} = {  comments : [], loading: false };

export const system = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    clean: (state) => {
      console.log('CLEAN ERROR')
      state.comments = [];
    },
    push: (state, action) => {
      if(!state.comments.find(c => c.id === action.payload.errorCode)){
        state.comments = [action.payload,...state.comments];
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
})

//Estrallendo actions
export const { clean, setLoading, push } = system.actions;

export default system.reducer