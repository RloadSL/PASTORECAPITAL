/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorApp } from "domain/ErrorApp/ErrorApp"
import { ErrorAuth } from "infrastructure/firebase/authentication.firebase"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { User } from "../../domain/User/User"
import { CreateUser } from "../../infrastructure/dto/users.dto"
import { createUser, signInEmailPassword, signUpEmailPassword, cleanAuthErrors, signOut, CODEVALIDATIONSTATE, setCodeValidation } from "../redux/slices/authentication/autentication.slice"
import { authenticationError, codeValidated, getIsLogged, getUserCredentialLogged, getUserLogged, isLoading } from "../redux/slices/authentication/authentication.selectors"
import { AppDispatch } from "../redux/store"
import { useSystem } from "./system.hooks"
/**
 * CustomHooks de authentication para manipular el estado de redux en laaplicación
 * @returns {Object}
 */
export const useAuthentication = () => {
  
  const dispatch = useDispatch<AppDispatch>()
  const userLogged:User = useSelector(getUserLogged)
  const userCredential:User = useSelector(getUserCredentialLogged)
  const isLogged:boolean = useSelector(getIsLogged)
  const loadingState:boolean = useSelector(isLoading)
  const authError:ErrorApp= useSelector(authenticationError)
  const codeValidatedState:CODEVALIDATIONSTATE = useSelector(codeValidated)
  
  const signUp:Function = (data:CreateUser) => dispatch(signUpEmailPassword(data));
  const signIn:Function = (data:CreateUser) => dispatch(signInEmailPassword(data));
  const signOutUser:Function = (data:CreateUser) => dispatch(signOut());
  const createUserById:Function = (user:any)=> dispatch(createUser(user.uid));
  const cleanError:Function = ()=> dispatch(cleanAuthErrors());
  const setCodeState:Function = (codeState: CODEVALIDATIONSTATE) => dispatch(setCodeValidation(codeState))
  
 

  return {
    loadingState,
    codeValidatedState,
    setCodeState,
    signUp,
    signIn,
    signOutUser,
    isLogged,
    userLogged,
    createUserById,
    cleanError,
    authError,
    userCredential
  }
}