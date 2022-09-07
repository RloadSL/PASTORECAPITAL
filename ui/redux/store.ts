import { configureStore } from '@reduxjs/toolkit'
import  autheticationReducer  from './slices/authentication/autentication.slice'
import systemReducer from './slices/system/system.slice';

 const store = configureStore({
  reducer: {
    authentication: autheticationReducer,
    system: systemReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
  
})
export default store;

export type AppDispatch = typeof store.dispatch