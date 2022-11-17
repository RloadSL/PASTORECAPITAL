import { env } from "./firebase/config";

export const LOGO_PASTORE_URL = 'https://firebasestorage.googleapis.com/v0/b/pastore-capital.appspot.com/o/static-files%2Flog[…]?alt=media&token=ddc8b10b-6b80-40f6-9ec9-8104d3752b6f';

export const HOST =  env === "prod" ? 'https://pastorecapital.verce.app' : 'https://pastore-test.vercel.app'; //Production 
 //OJO