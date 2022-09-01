
import { initializeApp } from "firebase-admin";
import { SingUpTrigger } from "./Authentication/ sign-in";
initializeApp();

//Module Authentication//
export const SingUpOnCallFunctions = SingUpTrigger;
//Module Authentication//