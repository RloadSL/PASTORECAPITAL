import { createSlice } from "@reduxjs/toolkit";



const initialState: {
  lastSnapshoot: any,
  loading: boolean
} = { lastSnapshoot: null, loading: false };

export const system = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    setLastSnapshoot: (state, action) => {
      state.lastSnapshoot = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  
})

//Estrallendo actions
export const { setLastSnapshoot, setLoading } = system.actions;

export default system.reducer