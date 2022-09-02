import { https } from 'firebase-functions';
import { auth } from "firebase-admin";
import { setUser } from '../Users/users';


const disableUser = async (uid:string, context: https.CallableContext)=>{
  if(typeof uid !== 'string' ) return {status: 400, error: 'UID expected as string'}
  try {
    await auth().updateUser(uid, {
      disabled: true
    });
    await setUser(uid, {disabled: true})
    return {status: 200, error: null, uid: uid}
  } catch (error) {
    return {status: 500, error}
  }
}

export const DisableUserTrigger = https.onCall((data, context)=>disableUser(data,context))