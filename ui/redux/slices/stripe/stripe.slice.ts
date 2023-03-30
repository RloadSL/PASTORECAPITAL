import { createSlice } from "@reduxjs/toolkit";


const initialState: {
  client_secret?: string,
  loading: boolean,
  intent? : any
} = {  loading: false};

export const stripe = createSlice({
  name: 'stripe',
  initialState,
  reducers: {
    cleanStripe: (state) => {
      console.log('CLEAN stripe')
      state.client_secret = undefined;
      state.intent = undefined;
      state.loading = false;
    },
    setClientSecret: (state, action) => {
      state.client_secret = action.payload
    },
    setIntentPayment: (state, action) => {
      state.intent = action.payload
    },
    setLoadingStripe: (state, action) => {
      state.loading = action.payload;
    }
  }
})

//Estrallendo actions
export const { cleanStripe, setLoadingStripe, setClientSecret , setIntentPayment} = stripe.actions;

export default stripe.reducer