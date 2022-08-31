import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthenticationRepository } from '../../../../domain/Authentication/authentication.repository'
import { User } from '../../../../domain/User/User'
import { AuthenticationRepositoryImplementation } from '../../../../infrastructure/retpositories/authentication.repository'
import { UserRepositoryImplementation } from '../../../../infrastructure/retpositories/users.repository';

const authRepository = new AuthenticationRepositoryImplementation();
const userRepository = new UserRepositoryImplementation();

export const signInEmailPassword = createAsyncThunk(
  'auth@signInEmailPassword',
  async (credentials: { email: string, password: string }) => {
    const { email, password } = credentials;
    try {
      const response = await authRepository.signInEmailPassword(email, password)
      const { userCredential, error } = response;
      if (!userCredential) return error; //retorna usuario invitado
      const user = await userRepository.read(userCredential)
      return user;
    } catch (error) {
      alert(error)
      return error;
    }
  }
)
const initialState: {
  userLogged: User | null,
  authError: any[],
  loggued:boolean
} = { userLogged: null, authError: [], loggued: false};

export const authetication = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    cleanAuthErrors : (state) => {
      state.authError = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signInEmailPassword.fulfilled, (state, action) => {
      if (action.payload instanceof User){
        state.userLogged = action.payload
        state.authError = []
        state.loggued = true
      } 
      else{
        state.userLogged = null
        state.authError.push(action.payload)
        state.loggued = false
      } 
    })
  },
})

//Estrallendo actions
export const {cleanAuthErrors} = authetication.actions;

export default authetication.reducer