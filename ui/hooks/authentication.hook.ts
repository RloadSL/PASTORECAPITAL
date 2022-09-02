/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { User } from "../../domain/User/User"
import { CreateUser } from "../../infrastructure/dto/users.dto"
import { ErrorAuth } from "../../infrastructure/firebase/authentication.firebase"
import { createUser, onChangeAuthState, signInEmailPassword, signUpEmailPassword } from "../redux/slices/authentication/autentication.slice"
import { authenticationError, getIsLogged, getUserLogged } from "../redux/slices/authentication/authentication.selectors"
import { AppDispatch } from "../redux/store"

export const useAuthentication = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userLogged:User = useSelector(getUserLogged)
  const isLogged:User = useSelector(getIsLogged)
  const authError = useSelector(authenticationError)
  const route = useRouter()
  
  const signUp:Function = (data:CreateUser) => dispatch(signUpEmailPassword(data));
  const signIn:Function = (data:CreateUser) => dispatch(signInEmailPassword(data));
  const createUserById:Function = (user:any)=> dispatch(createUser(user.uid));

  useEffect(() => {
    if(isLogged){
      route.push('/')
    }
   
   }, [isLogged])

   useEffect(() => {
    onChangeAuthState(createUserById)
    
   }, [])
  return {
    signUp,
    signIn,
    isLogged,
    userLogged,
    authError
  }
}