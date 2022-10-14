import { Comments } from "domain/Comments/comments";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { DocumentSnapshot } from "firebase/firestore";

/**
 * Devuelve los errores del sistema, todos los errores se almacenan en este array.
 */
 export const getLastCommentsState = (store:any):DocumentSnapshot => store.comments.lastSnapshoot

 /**
 * Devuelve el estado de loading de la plataforma.
 */
  export const loading = (store:any):boolean => store.comments.loading