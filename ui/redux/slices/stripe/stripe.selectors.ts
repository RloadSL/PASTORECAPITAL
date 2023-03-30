


export const client_secret = (store:any):string => store.stripe.client_secret
export const intentPayment = (store:any):any => store.stripe.intent

 /**
 * Devuelve el estado de loading de la plataforma.
 */
  export const loading = (store:any):boolean => store.stripe.loading