import { createSlice } from "@reduxjs/toolkit";
import { Chatroom } from "domain/Chatroom/Chatroom";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { InfoApp } from "domain/InfoApp/InfoApp";
import { News } from "domain/News/News";
import { Post } from "domain/Post/Post";
import { Webinars } from "domain/Webinars/Webinars";

const initialState: {
  news?: any,
  webinar?: any
  ama?: any
  research?: any
  fu?:any,
  publi?:any
} = {};

export const dashboard = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
    setDashboardNewsState: (state, action) => {
      state.news = action.payload
    },
    setDashboardAmaState: (state, action) => {
      state.ama = action.payload
    },
    setDashboardFUState: (state, action) => {
      state.fu = action.payload
    },
    setDashboardResearchState: (state, action) => {
      state.research = action.payload
    },
    setDashboardWebinarState: (state, action) => {
      state.webinar = action.payload
    },
    setDashboardPubliState: (state, action) => {
      state.publi = action.payload
    }
  }
})

//Estrallendo actions
export const {setDashboardPubliState, setDashboardNewsState, setDashboardAmaState, setDashboardFUState, setDashboardResearchState, setDashboardWebinarState } = dashboard.actions;

export default dashboard.reducer