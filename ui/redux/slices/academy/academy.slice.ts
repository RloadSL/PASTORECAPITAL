import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Course } from "domain/Course/Course";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { CourseRepositoryInstance } from "infrastructure/repositories/courses.repository";

export const academyGetCurses = createAsyncThunk(
  'academy@getCurses',
  async ({ offset, category }: { offset?: number, category?: string }, { getState }) => {
    try {
      const { academy } = getState() as any;
      if(!offset){
        offset = academy.courses ? academy.courses.length : 0
      }
      console.log('academy@getCurses offset', offset);
      const response = await CourseRepositoryInstance.readFromWp(offset, category)
      return academy.courses ? [...academy.courses, ...response] : response;

      return academy.courses || [];
    } catch (error) {
      return error;
    }
  }
)

const initialState: {
  errorApp: ErrorApp[],
  loading: boolean,

  courses?: Course[]
} = { errorApp: [], loading: false, courses: undefined };

export const academySlice = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(academyGetCurses.fulfilled, (state, action) => { state.courses = action.payload as Course[]; state.loading = false })
      .addCase(academyGetCurses.pending, (state) => { state.loading = true })
  }
})

//Estrallendo actions
//export const { } = academySlice.actions;

export default academySlice.reducer;