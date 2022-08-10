import { User } from "../../../../domain/User/User";

export const getUserLogged = (store:any) => store.authentication.userlogged
export const authenticationError = (store:any) => store.authentication.authError