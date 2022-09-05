import { User } from "domain/User/User"
import { AuthError } from "firebase/auth"

export const getUserLogged = (store:any):User => store.authentication.userLogged
export const getIsLogged = (store:any):boolean => store.authentication.loggued

export const authenticationError = (store:any):AuthError => store.authentication.authError

