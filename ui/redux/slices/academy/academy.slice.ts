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
      const { academy } = getState() as any;
      if (!offset) {
        offset = academy.courses ? academy.courses.length : 0
      }

      const response = await CourseRepositoryInstance.readFromWp(offset, filters, wpToken)
      return academy.courses ? { courses: [...academy.courses, ...response], private: wpToken != null } : { courses: response, private: wpToken != null };

    } catch (error) {
      return error;
    }
  }
)

export const academyGetTutorials = createAsyncThunk(
  'academy@getTutorials',
  async ({ offset, filters, wpToken }: { offset?: number, filters?: any, wpToken?: string }, { getState }) => {
    try {
      const { academy } = getState() as any;
      if (!offset) {
        offset = academy.courses ? academy.courses.length : 0
      }

      const response = await TutorialRepositoryInstance.readAll(offset, filters, wpToken)
      return academy.courses ? { tutorials: [...academy.courses, ...response], private: wpToken != null } : { tutorials: response, private: wpToken != null };

    } catch (error) {
      return error;
    }
  }
)



const initialState: {
  errorApp: ErrorApp[],
  loading: boolean,

  posts?: Course[] | Post[],
  privatePosts?: Course[] | Post[]
} = { errorApp: [], loading: false, posts: undefined, privatePosts: undefined };

export const academySlice = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    addAcedemyPrivateCourse: (state, action) => {
      state.privatePosts = [action.payload as Course, ...state.privatePosts as Course[]];
    },
    addAcademyPrivatePost: (state, action) => {
      state.privatePosts = [action.payload as Post, ...state.privatePosts as Course[]];
    },
    removeAcademyPost: (state, action) => {
      const { id, status } = action.payload;
      if (status === 'private') {
        const index = state.privatePosts?.findIndex(item => item.id === id)
        if (index != -1 && index != undefined) {
          state.privatePosts?.splice(index, 1);
        }
      } else {
        const index = state.posts?.findIndex(item => item.id == id)
        if (index != -1 && index != undefined) {
          state.posts?.splice(index, 1);
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      //CURSOS
      .addCase(academyGetCurses.fulfilled, (state: any, action: any) => {
        if (!action.payload.private) state.posts = action.payload.courses as Course[];
        else state.privatePosts = action.payload.courses as Course[];
        state.loading = false
        console.log('fulfilled', state.loading);
      })
      .addCase(academyGetCurses.pending, (state: any) => { 
        state.loading = true 
        console.log('pending', state.loading);
      })
      //TUTORIALES
      .addCase(academyGetTutorials.fulfilled, (state: any, action: any) => {
        if (!action.payload.private) state.posts = action.payload.tutorials as Post[];
        else state.privatePosts = action.payload.tutorials as Post[];
        state.loading = false
      })
      .addCase(academyGetTutorials.pending, (state: any) => { state.loading = true })

  }
})

//Estrallendo actions
export const { addAcademyPrivatePost, removeAcademyPost, addAcedemyPrivateCourse } = academySlice.actions;

export default academySlice.reducer;