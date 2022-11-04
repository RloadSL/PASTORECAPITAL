import { configureStore } from '@reduxjs/toolkit'
import academyReducer from './slices/wp-headless-api/wp-headless-api.slice';
import  autheticationReducer  from './slices/authentication/autentication.slice'
import systemReducer from './slices/system/system.slice';
import  commentsReducer  from './slices/comments/coments.slice'
 const store = configureStore({
  reducer: {
    authentication: autheticationReducer,
    system: systemReducer,
    academy: academyReducer,
    comments: commentsReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
  
})
export default store;

export type AppDispatch = typeof store.dispatch