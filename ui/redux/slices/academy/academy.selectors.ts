import { Course } from "domain/Course/Course";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";

/**
 * Devuelve los errores del sistema, todos los errores se almacenan en este array.
 */
 export const errors = (store:any):ErrorApp[] => store.academy.errorApp

 /**
 * Devuelve el estado de loading de la plataforma.
 */
  export const loadingStore = (store:any):boolean => store.academy.loading

  export const coursesStore = (store:any):Course[] => store.academy.courses