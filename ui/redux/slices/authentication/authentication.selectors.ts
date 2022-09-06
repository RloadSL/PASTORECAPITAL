import { User } from "domain/User/User"
import { ErrorAuth } from "infrastructure/firebase/authentication.firebase"
/**
 * Devuelve el usuario que esta logado en la aplicación o null en caso de invitado
 * @returns {User}
 */
export const getUserLogged = (store:any):User => store.authentication.userLogged
/**
 * Devuelve si existe un usuario logado en la aplicación
 * @returns {boolean}
 */
export const getIsLogged = (store:any):boolean => store.authentication.loggued
/**
 * Devuelve una pila de errores de authenticación
 * @returns {ErrorAuth[] }
 */
export const authenticationError = (store:any):ErrorAuth[] => store.authentication.authError

