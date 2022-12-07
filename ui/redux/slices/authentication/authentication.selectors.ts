import { ErrorApp } from "domain/ErrorApp/ErrorApp"
import { User } from "domain/UserConsultant/User"
import { CODEVALIDATIONSTATE } from "./autentication.slice"
/**
 * Devuelve el usuario que esta logado en la aplicación o null en caso de invitado
 * @returns {User}
 */
export const getUserLogged = (store:any):User => store.authentication.userLogged
export const getUserCredentialLogged = (store:any):User => store.authentication.userCredential

/**
 * Devuelve si existe un usuario logado en la aplicación
 * @returns {boolean}
 */
export const getIsLogged = (store:any):boolean => store.authentication.loggued
/**
 * Devuelve una pila de errores de authenticación
 * @returns {ErrorApp[] }
 */
export const authenticationError = (store:any):ErrorApp => store.authentication.authError

export const isLoading = (store:any):boolean => store.authentication.loading

export const codeValidated = (store:any):CODEVALIDATIONSTATE => store.authentication.code_validated
