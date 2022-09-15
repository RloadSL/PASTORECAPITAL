import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ErrorApp } from 'domain/ErrorApp/ErrorApp'
import { AuthImplInstance } from 'infrastructure/repositories/authentication.repository';
import { UserRepositoryImplInstance } from 'infrastructure/repositories/users.repository';
import { User } from '../../../../domain/User/User'
import { CreateUser } from '../../../../infrastructure/dto/users.dto';


export const onChangeAuthState = (callback: Function) => AuthImplInstance.onUserChange(callback)


export const signInEmailPassword = createAsyncThunk(
  'auth@signInEmailPassword',
  async (credentials: { email: string, password: string }) => {
    const { email, password } = credentials;
    try {
      const response = await AuthImplInstance.signInEmailPassword(email, password)
      const { userCredential, error } = response;
      if (!userCredential) return error; //retorna usuario invitado
      const user = await UserRepositoryImplInstance.read(userCredential.uid)
      return user;
    } catch (error) {
      return error;
    }
  }
)

export const signUpEmailPassword = createAsyncThunk(
  'auth@signUpEmailPassword',
  async (data: CreateUser) => {
    try {
      const response = await AuthImplInstance.signUp(data)
      const { userCredential, error } = response;
      if (!userCredential) return error; //retorna usuario invitado
      const user = await UserRepositoryImplInstance.read(userCredential.uid)
      return user;
    } catch (error) {
      return error;
    }
  }
)

export const signOut = createAsyncThunk(
  'auth@signOut',
  async () => {
    console.log('auth@signOut')
    try {
      await AuthImplInstance.signOut()
      const user = null
      return user;
    } catch (error) {
      return error;
    }
  }
)

export const createUser = createAsyncThunk(
  'auth@createUser',
  async ({uid , extradata}: {uid: string, extradata?: {webToken:string}}) => {
    try {
      const user = await UserRepositoryImplInstance.read(uid, extradata)
      return user;
    } catch (error) {
      return error;
    }
  }
)

export const sendEmailCode = createAsyncThunk(
  'auth@sendEmailCode',
  async (arg: { email: string }) => {
    try {
      const res = await AuthImplInstance.sendSecurityCode(arg)
      return res;
    } catch (error) {
      return error;
    }
  }
)

export const validateCode = createAsyncThunk(
  'auth@validateCode',
  async (arg: { code: number, email:string }) => {
    try {
      const res = await AuthImplInstance.validateCode(arg)
      return res;
    } catch (error) {
      return error;
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth@resetPassword',
  async (arg: { newPassword: string, email:string }) => {
    try {
      const res = await AuthImplInstance.recoverPass(arg)
      return res;
    } catch (error) {
      return error;
    }
  }
)


const _handleSignIn = (state: any, action: any) => {
  if (action.payload instanceof User) {
    state.userLogged = action.payload
    state.authError = null
    state.loggued = true
  }
  else {
    if (action.payload) {
      state.authError = action.payload
    }
  }
  state.loading = false
}

const _handleSendMailCode = (state: any, action:any) => { 
  const payload:{state:CODEVALIDATIONSTATE , error:any } = action.payload;
  if(payload.error){
    state.authError = payload.error
  }
  state.code_validated = payload.state
  state.loading = false
}

const _handleValidateCode = (state: any, action:any) => { 
  const payload:{state:CODEVALIDATIONSTATE , error:any } = action.payload;
  if(payload.error){
    state.authError = payload.error
  }
  state.code_validated = payload.state
  state.loading = false
}

const _handleResetPassword = (state: any, action:any) => { 
  const payload:{state:CODEVALIDATIONSTATE , error:any } = action.payload;
  if(payload.error){
    state.authError = payload.error
  }
  state.code_validated = payload.state
  state.loading = false
}

export type CODEVALIDATIONSTATE = 'init' | 'waiting' | 'validated' | 'redirect'
const initialState: {
  userLogged: User | null,
  authError: ErrorApp | null,
  loggued: boolean,
  loading: boolean,
  code_validated: CODEVALIDATIONSTATE
} = { userLogged: null, authError: null, loggued: false, loading: true, code_validated: 'init' };

export const authetication = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    cleanAuthErrors: (state) => {
      state.authError = null;
    }, 
    setCodeValidation : (state, action)=>{
      state.code_validated = action.payload
    },
    setAuthLoading : (state, action)=>{
      state.loading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInEmailPassword.fulfilled, _handleSignIn)
      .addCase(signInEmailPassword.pending, (state) => { state.loading = true })
      .addCase(signUpEmailPassword.fulfilled, _handleSignIn)
      .addCase(signUpEmailPassword.pending, (state) => { state.loading = true })
      .addCase(createUser.fulfilled, _handleSignIn)
      .addCase(createUser.pending, (state) => { state.loading = true })
      .addCase(signOut.fulfilled, (state: any, action: any) => { state.userLogged = null, state.loggued = false, state.authError = null, state.loading = false })
      .addCase(sendEmailCode.fulfilled, _handleSendMailCode)
      .addCase(sendEmailCode.pending, (state) => { state.loading = true })
      .addCase(validateCode.fulfilled, _handleValidateCode)
      .addCase(validateCode.pending, (state) => { state.loading = true })
      .addCase(resetPassword.fulfilled, _handleResetPassword)
      .addCase(resetPassword.pending, (state) => { state.loading = true })
  }
})

//Estrallendo actions
export const { cleanAuthErrors, setCodeValidation, setAuthLoading } = authetication.actions;

export default authetication.reducer