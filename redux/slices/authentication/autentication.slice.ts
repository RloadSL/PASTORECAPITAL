import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../../domain/User/User'

export const authetication = createSlice({
  name: 'Authentication',
  initialState: {userLogged : new User({fullName: 'Invitado', role: {level: 0, label: 'Invitado'}})},
  reducers: {
    login : (state, action) => {
      state.userLogged = action.payload
    },
    signOut: (state) => {
      state.userLogged = new User({fullName: 'Invitado', role: {level: 0, label: 'Invitado'}})
    },
    signUp: (state, action) => {
      state.userLogged = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { login , signOut, signUp } = authetication.actions

export default authetication.reducer