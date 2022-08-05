import { configureStore } from '@reduxjs/toolkit'
import  autheticationReducer  from './slices/authentication/autentication.slice'

export default configureStore({
  reducer: {
    authentication: autheticationReducer
  },
})