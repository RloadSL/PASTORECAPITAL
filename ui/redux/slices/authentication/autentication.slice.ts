import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserCredential, User as FireUser } from 'firebase/auth';
import { User } from '../../../../domain/User/User'
import { CreateUser } from '../../../../infrastructure/dto/users.dto';
import { AuthenticationRepositoryImplementation } from '../../../../infrastructure/retpositories/authentication.repository'
import { UserRepositoryImplementation } from '../../../../infrastructure/retpositories/users.repository';

const authRepository = AuthenticationRepositoryImplementation.getInstance();
const userRepository = new UserRepositoryImplementation();

export const onChangeAuthState = (callback:Function)=> authRepository.onUserChange(callback)


export const signInEmailPassword = createAsyncThunk(
  'auth@signInEmailPassword',
  async (credentials: { email: string, password: string }) => {
    const { email, password } = credentials;
    try {
      const response = await authRepository.signInEmailPassword(email, password)
      const { userCredential, error } = response;
      if (!userCredential) return error; //retorna usuario invitado
      const user = await userRepository.read(userCredential.uid)
      
      return user;
    } catch (error) {
      alert(error)
      return error;
    }
  }
)

export const signUpEmailPassword = createAsyncThunk(
  'auth@signUpEmailPassword',
  async (data: CreateUser) => {
    try {
      const response = await authRepository.signUp(data)
      const { userCredential, error } = response;
      if (!userCredential) return error; //retorna usuario invitado
      const user = await userRepository.read(userCredential.uid)
      return user;
    } catch (error) {
      alert(error)
      return error;
    }
  }
)

export const signOut = createAsyncThunk(
  'auth@signOut',
  async () => {
    try {
      await authRepository.signOut()
      const user = null
      return user;
    } catch (error) {
      return error;
    }
  }
)

export const createUser = createAsyncThunk(
  'auth@createUser',
  async (uid: string) => {
    try {
      const user = await userRepository.read(uid)
      return user;
    } catch (error) {
      alert(error)
      return error;
    }
  }
)

const _handleSignIn = (state:any, action:any) => {
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
}

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
    builder
    .addCase(signInEmailPassword.fulfilled, _handleSignIn)
    .addCase(signUpEmailPassword.fulfilled, _handleSignIn)
    .addCase(createUser.fulfilled, _handleSignIn)
    .addCase(signOut.fulfilled, _handleSignIn)
  },
})

//Estrallendo actions
export const {cleanAuthErrors} = authetication.actions;

export default authetication.reducer