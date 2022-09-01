import { UserCredential } from "firebase/auth"

export const getUserLogged = (store:any):UserCredential => store.authentication.userlogged
export const authenticationError = (store:any):string => store.authentication.authError

