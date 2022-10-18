import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Course } from "domain/Course/Course";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { Post } from "domain/Post/Post";
import { CourseRepositoryInstance } from "infrastructure/repositories/courses.repository";
import { TutorialRepositoryInstance } from "infrastructure/repositories/tutorials.repository";



export const academyGetCurses = createAsyncThunk(
  'academy@getCurses',
  async ({ offset, filters, wpToken }: { offset?: number, filters?: any, wpToken?: string }, { getState }) => {
    try {
      const response = await CourseRepositoryInstance.readFromWp(offset, filters, wpToken)
      return { courses: response, offset}; 

    } catch (error) {
      return error;
    }
  }
)

export const academyGetTutorials = createAsyncThunk(
  'academy@getTutorials',
  async ({ offset, filters, wpToken}: { offset?: number, filters?: any, wpToken?: string }, { getState }) => {
    try {
      const response = await TutorialRepositoryInstance.readAll(offset, filters, wpToken)
      return { tutorials: response, offset}; 

    } catch (error) {
      return error;
    }
  }
)



const initialState: {
  errorApp: ErrorApp[],
  loading: boolean,

  posts?:{ items: Course[] | Post[] , hasMore: boolean},
  privatePosts?: Course[] | Post[]
} = { errorApp: [], loading: false, posts: undefined, privatePosts: undefined };

export const academySlice = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    cleanAcademyPosts: (state, action) => {
      state.posts = {items: [] , hasMore: true};
    },
    addAcedemyPrivateCourse: (state, action) => {
      state.privatePosts = [action.payload as Course, ...state.privatePosts as Course[]];
    },
   
    removeAcademyPost: (state, action) => {
        const { id, status } = action.payload;
        const index = state.posts?.items.findIndex(item => item.id == id)
        if (index != -1 && index != undefined && state.posts) {
          state.posts.items.splice(index, 1);
        }
        
    }
  },
  extraReducers: (builder) => {
    builder
      //CURSOS
      .addCase(academyGetCurses.fulfilled, (state: any, action: any) => {
        if(state.posts && action.payload.offset){
          state.posts.items = state.posts.items.concat(action.payload.courses)
        }else{
          state.posts.items = action.payload.courses
        }
        state.posts.hasMore = action.payload.courses.length === 5;
        state.loading = false
      })
      .addCase(academyGetCurses.pending, (state: any) => { 
        state.loading = true 
      })
      //TUTORIALES
      .addCase(academyGetTutorials.fulfilled, (state: any, action: any) => {
        if(state.posts && action.payload.offset){
          state.posts.items = state.posts.items.concat(action.payload.tutorials)
        }else{
          state.posts.items = action.payload.tutorials
        }
        state.posts.hasMore = action.payload.tutorials.length === 5;
        state.loading = false
      })
      .addCase(academyGetTutorials.pending, (state: any) => { state.loading = true })

  }
})

//Estrallendo actions
export const { cleanAcademyPosts,removeAcademyPost, addAcedemyPrivateCourse } = academySlice.actions;

export default academySlice.reducer;