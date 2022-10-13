import { ErrorApp } from "domain/ErrorApp/ErrorApp";

/**
 * Devuelve los errores del sistema, todos los errores se almacenan en este array.
 */
 export const comments = (store:any):ErrorApp[] => store.comments.comments

 /**
 * Devuelve el estado de loading de la plataforma.
 */
  export const loading = (store:any):boolean => store.comments.loading