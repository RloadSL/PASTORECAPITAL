import { https } from 'firebase-functions';
import { auth } from "firebase-admin";




const recoverPassword = async ({newPassword, uid}:{newPassword: string, uid:string}, context: https.CallableContext)=>{
  if(!newPassword || !uid) return {status: 400, error: 'Data contains undefined value'}
  try {
    auth().updateUser(uid, {password: newPassword})
    return {status: 200, error: null, uid}
  } catch (error) {
    console.log(error)
    return {status: 500, error}
  }
}

export const RecoverPasswordTrigger = https.onCall((data, context)=>recoverPassword(data,context))

