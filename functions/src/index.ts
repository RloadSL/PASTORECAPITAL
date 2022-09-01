
import * as admin  from "firebase-admin";
import { SingUpTrigger } from "./Authentication/sign-in";
admin.initializeApp();

//Module Authentication//
export const SingUpOnCallFunctions = SingUpTrigger;
//Module Authentication//


