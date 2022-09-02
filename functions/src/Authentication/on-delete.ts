import { auth as Auth } from 'firebase-admin';
import { EventContext, https, auth } from 'firebase-functions';

import { UserRecord } from 'firebase-functions/v1/auth';
import { deleteUser } from '../Users/users';


const onDeleteUser = async (user:UserRecord, context: EventContext)=> {
  return deleteUser(user.uid);
}

export const OnDeleteUserTrigger =  auth.user().onDelete((user:UserRecord, context: EventContext)=>onDeleteUser(user, context))


const deleteUserAuthentication = async (uid:string, context: https.CallableContext)=>{
  if(typeof uid !== 'string' ) return {status: 400, error: 'UID expected as string'}
  try {
    await Auth().deleteUser(uid);
    return {status: 200, error: null, uid: uid}
  } catch (error) {
    return {status: 500, error}
  }
}

export const DeleteUserAuthenticationTrigger = https.onCall((data, context)=>deleteUserAuthentication(data, context))