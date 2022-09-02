import { UserCredential } from "firebase/auth"

export const getUserLogged = (store:any):UserCredential => store.authentication.userLogged
export const getIsLogged = (store:any):UserCredential => store.authentication.loggued

export const authenticationError = (store:any):string => store.authentication.authError

