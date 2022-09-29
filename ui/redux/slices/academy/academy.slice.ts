import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Course } from "domain/Course/Course";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { CourseRepositoryInstance } from "infrastructure/repositories/courses.repository";



export const academyGetCurses = createAsyncThunk(
  'academy@getCurses',
  async ({ offset, category , wpToken}: { offset?: number, category?: string , wpToken?:string}, { getState }) => {
    try {
      const { academy } = getState() as any;
      if(!offset){
        offset = academy.courses ? academy.courses.length : 0
      }
      const response = await CourseRepositoryInstance.readFromWp(offset, category, wpToken)
      return academy.courses ? {courses: [...academy.courses, ...response], private: wpToken != null} : {courses: response,  private: wpToken != null};

      
    } catch (error) {
      return error;
    }
  }
)

const initialState: {
  errorApp: ErrorApp[],
  loading: boolean,

  posts?: Course[],
  privatePosts?: Course[]
} = { errorApp: [], loading: false, posts: undefined, privatePosts: undefined };

export const academySlice = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(academyGetCurses.fulfilled, (state, action: any) => { 
        console.log('extraReducers', action.payload.private)
        if(!action.payload.private) state.posts = action.payload.courses as Course[];
        else state.privatePosts = action.payload.courses as Course[];
        state.loading = false 
      })
      .addCase(academyGetCurses.pending, (state) => { state.loading = true })
  }
})

//Estrallendo actions
//export const { } = academySlice.actions;

export default academySlice.reducer;