/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorApp } from "domain/ErrorApp/ErrorApp"
import { ErrorAuth } from "infrastructure/firebase/authentication.firebase"
import { useDispatch, useSelector } from "react-redux"
import { User } from "../../domain/User/User"
import { CreateUser } from "../../infrastructure/dto/users.dto"
import { createUser, signInEmailPassword, signUpEmailPassword, cleanAuthErrors, signOut } from "../redux/slices/authentication/autentication.slice"
import { authenticationError, getIsLogged, getUserLogged } from "../redux/slices/authentication/authentication.selectors"
import { AppDispatch } from "../redux/store"
/**
 * CustomHooks de authentication para manipular el estado de redux en laaplicación
 * @returns {Object}
 */
export const useAuthentication = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userLogged:User = useSelector(getUserLogged)
  const isLogged:boolean = useSelector(getIsLogged)
  const authError:ErrorApp[] = useSelector(authenticationError)
  
  const signUp:Function = (data:CreateUser) => dispatch(signUpEmailPassword(data));
  const signIn:Function = (data:CreateUser) => dispatch(signInEmailPassword(data));
  const signOutUser:Function = (data:CreateUser) => dispatch(signOut());
  const createUserById:Function = (user:any)=> dispatch(createUser(user.uid));
  const cleanError:Function = ()=> dispatch(cleanAuthErrors());

  
  return {
    signUp,
    signIn,
    signOutUser,
    isLogged,
    userLogged,
    createUserById,
    cleanError,
    authError
  }
}