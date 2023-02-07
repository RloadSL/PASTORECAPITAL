import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { QueryElastic } from "domain/Interfaces/QueryElastic";
import { UserConsultant } from "domain/UserConsultant/UserConsultant";
import { ELASTIC_QUERY } from "infrastructure/elasticsearch/search.elastic";
import userConsultantRepository from "infrastructure/repositories/userConsultant.repository";

export interface  TAX_CONSULTANT_STATE {
  queryResult: {error: any, items: Array<any>, pages?:any}
  loading: boolean
  currentConsultant?: UserConsultant 
}

const initialState: TAX_CONSULTANT_STATE = {currentConsultant: undefined, loading: true, queryResult : {error: null, items: [] }};

export const searchConsultants = createAsyncThunk(
  'taxConsultant@search',
  async (query: ELASTIC_QUERY = {query:''}) => {
    try {
      const response = await userConsultantRepository.searchUserConsultants(query)
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
    setCurrentConsultant: (state, action) => {
      state.currentConsultant = action.payload;
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
      const pages = state.queryResult.pages
      const {error, items} = action.payload
      if(!error)
        state.queryResult ={error: null, items: [...currentItems, ...items], pages } 
    })
  }
})

//Estrallendo actions
export const { clean, setLoading, setCurrentConsultant } = taxCosultant.actions;

export default taxCosultant.reducer