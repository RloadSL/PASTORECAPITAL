import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Course } from "domain/Course/Course";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { Post } from "domain/Post/Post";
import { AnalysisRepositoryInstance, ANALYSIS_QUERY } from "infrastructure/repositories/analysis.repository";
import { CourseRepositoryInstance } from "infrastructure/repositories/courses.repository";
import { TutorialRepositoryInstance } from "infrastructure/repositories/tutorials.repository";


//Todas las funcionalidades de este redux responden sobre Post por lo que se almacenan en el mismo estado 
//Academy && Analysis

/**
 * Obtener cursos desde el headless
 */
export const academyGetCurses = createAsyncThunk(
  'academy@getCurses',
  async ({ offset, filters, wpToken }: { offset?: number, filters?: any, wpToken?: string }, { getState }) => {
    try {
      const response = await CourseRepositoryInstance.readFromWp(offset, filters, wpToken)
      return { courses: response, offset };

    } catch (error) {
      return error;
    }
  }
)
/**
 * Obtener tutoriales desde el headless
 */
export const academyGetTutorials = createAsyncThunk(
  'academy@getTutorials',
  async ({ offset, filters, wpToken }: { offset?: number, filters?: any, wpToken?: string }, { getState }) => {
    try {
      const response = await TutorialRepositoryInstance.readAll(offset, filters, wpToken)
      return { tutorials: response, offset };

    } catch (error) {
      return error;
    }
  }
)
/**
 * Obtener artículos desde el headless
 */
export const getAnalysisArticles = createAsyncThunk(
  'analysis@getAnalysisArticles',
  async ({ wpToken, userDataToken, query }: { wpToken?: string, userDataToken?: string, query?: ANALYSIS_QUERY }, { getState }) => {
    try {
      const response = await AnalysisRepositoryInstance.getArticles(userDataToken, wpToken, { ...query, posts_per_page: 5 })

      return { articles: response, offset: query?.offset };

    } catch (error) {
      return error;
    }
  }
)

/**
 * Estado inicial 
 */
const initialState: {
  /**
   * Errores devueltos por las llamadas
   */
  errorApp: ErrorApp[],
  loading: boolean,
  /**
   * Respuesta de las llamadas GET
   */
  posts?: { 
    /**
     * Posts devueltos por el headless
     */
    items: Course[] | Post[], 
    /**
     * Bandera del loadmore
     */
    hasMore: boolean },
  privatePosts?: Course[] | Post[]
} = { errorApp: [], loading: false, posts: undefined, privatePosts: undefined };

export const wpHeadless = createSlice({
  name: 'WpHeadless',
  initialState,
  reducers: {
    cleanAcademyPosts: (state, action) => {
      state.posts = { items: [], hasMore: true };
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
        if (state.posts && action.payload.offset) {
          state.posts.items = state.posts.items.concat(action.payload.courses)
        } else {
          state.posts.items = action.payload.courses
        }
        state.posts.hasMore = action.payload.courses?.length === 5;
        state.loading = false
      })
      .addCase(academyGetCurses.pending, (state: any) => {
        state.loading = true
      })
      //TUTORIALES
      .addCase(academyGetTutorials.fulfilled, (state: any, action: any) => {
        if (state.posts && action.payload.offset) {
          state.posts.items = state.posts.items.concat(action.payload.tutorials)
        } else {
          state.posts.items = action.payload.tutorials
        }
        state.posts.hasMore = action.payload.tutorials.length === 5;
        state.loading = false
      })
      .addCase(academyGetTutorials.pending, (state: any) => { state.loading = true })
      //ANALYSIS ARTICLES
      .addCase(getAnalysisArticles.fulfilled, (state: any, action: any) => {
        if (state.posts && action.payload.offset) {
          state.posts.items = state.posts.items.concat(action.payload.articles)
        } else {
          state.posts.items = action.payload.articles
        }
        state.posts.hasMore = action.payload.articles.length === 5;
        state.loading = false
      })
      .addCase(getAnalysisArticles.pending, (state: any) => { state.loading = true })

  }
})

//Estrallendo actions
export const { cleanAcademyPosts, removeAcademyPost, addAcedemyPrivateCourse } = wpHeadless.actions;

export default wpHeadless.reducer;