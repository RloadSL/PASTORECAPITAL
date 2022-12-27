import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { QueryElastic } from "domain/Interfaces/QueryElastic";
import { UserConsultant } from "domain/UserConsultant/UserConsultant";
import userConsultantRepository from "infrastructure/repositories/userConsultant.repository";

export interface  TAX_CONSULTANT_STATE {
  queryResult: {error: any, items: Array<any>}
  loading: boolean
}

const initialState: TAX_CONSULTANT_STATE = { loading: true, queryResult : {error: null, items: [] }};

export const searchConsultants = createAsyncThunk(
  'taxConsultant@search',
  async (query?: QueryElastic) => {
    try {
      const response = await userConsultantRepository.searchUserConsultants()
      return response
    } catch (error) {
      return {error, items: []};
    }
  }
)

export const taxCosultant = createSlice({
  name: 'TaxConsultants',
  initialState,
  reducers: {
    clean: (state) => {
      state.queryResult = {error: null, items: []};
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers : (builder) => {
    builder
    .addCase(searchConsultants.pending, (state) => { state.loading = true })
    .addCase(searchConsultants.fulfilled, (state: any, action: any)=>{ 
      state.loading = false; 
      const currentItems = state.queryResult.items
      const {error, items} = action.payload
      if(!error)
        state.queryResult ={error: null, items: [...currentItems, ...items] } 
    })
  }
})

//Estrallendo actions
export const { clean, setLoading } = taxCosultant.actions;

export default taxCosultant.reducer