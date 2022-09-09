
import * as admin  from "firebase-admin";
import { DisableUserTrigger } from "./Authentication/disable-user";
import { DeleteUserAuthenticationTrigger, OnDeleteUserTrigger } from "./Authentication/on-delete";
import { RecoverPasswordTrigger } from "./Authentication/reset-password";
import { SendSecurityCodeTrigger, ValidateSecurityCodeTrigger } from "./Authentication/security";
import { SingUpTrigger, } from "./Authentication/sign-up";
admin.initializeApp();

//Module Authentication//
export const SingUpOnCallFunctions = SingUpTrigger;
export const OnDeleteUserFunctions = OnDeleteUserTrigger;
export const DisableUserFunctions = DisableUserTrigger;
export const DeleteUserAuthenticationFunctions = DeleteUserAuthenticationTrigger
export const SendSecurityCodeFunctions = SendSecurityCodeTrigger
export const ValidateSecurityCodeTriggerFunctions = ValidateSecurityCodeTrigger
export const RecoverPasswordTriggerFunctions =  RecoverPasswordTrigger
//Module Authentication//


