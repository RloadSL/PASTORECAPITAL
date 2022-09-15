import { ErrorApp } from "domain/ErrorApp/ErrorApp";

/**
 * Devuelve los errores del sistema, todos los errores se almacenan en este array.
 */
 export const errors = (store:any):ErrorApp[] => store.system.errorApp

 /**
 * Devuelve el estado de loading de la plataforma.
 */
  export const loading = (store:any):boolean => store.system.loading