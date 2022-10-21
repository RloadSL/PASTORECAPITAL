import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { InfoApp } from "domain/InfoApp/InfoApp";

/**
 * Devuelve los errores del sistema, todos los errores se almacenan en este array.
 */
 export const errors = (store:any):ErrorApp[] => store.system.errorApp
/**
 * Devuelve los mensajes del sistema, todos los errores se almacenan en este array.
 */
 export const systemMessages = (store:any):InfoApp[] => store.system.infoApp


 /**
 * Devuelve el estado de loading de la plataforma.
 */
  export const loading = (store:any):boolean => store.system.loading