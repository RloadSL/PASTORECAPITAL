
import * as admin  from "firebase-admin";
import { DisableUserTrigger } from "./Authentication/disable-user";
import { DeleteUserAuthenticationTrigger, OnDeleteUserTrigger } from "./Authentication/on-delete";
import { SingUpTrigger, } from "./Authentication/sign-in";
admin.initializeApp();

//Module Authentication//
export const SingUpOnCallFunctions = SingUpTrigger;
export const OnDeleteUserFunctions = OnDeleteUserTrigger;
export const DisableUserFunctions = DisableUserTrigger;
export const DeleteUserAuthenticationFunctions = DeleteUserAuthenticationTrigger
//Module Authentication//


