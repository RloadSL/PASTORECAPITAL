import { composeWithDevTools } from '@redux-devtools/extension/lib/types/logOnly';
import { configureStore } from '@reduxjs/toolkit'
import  autheticationReducer  from './slices/authentication/autentication.slice'

 const store = configureStore({
  reducer: {
    authentication: autheticationReducer,
    
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
  
})
export default store;

export type AppDispatch = typeof store.dispatch