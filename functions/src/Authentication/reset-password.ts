import { https } from 'firebase-functions';
import { auth } from "firebase-admin";
import { deleteUserFields, getUser } from '../Users/users';




const recoverPassword = async ({newPassword, email}:{newPassword: string, email:string}, context: https.CallableContext)=>{
  if(!newPassword || !email) return {status: 400, error: 'Data contains undefined value'}
  try {
    const userRecord = await auth().getUserByEmail(email)
    const user = await getUser(userRecord.uid);
    if (!user?.security_code || user?.security_code.code != 1) return { status: 401, error: 'Unauthorized' }
   
    await auth().updateUser(userRecord.uid, {password: newPassword})
    await deleteUserFields(userRecord.uid, { security_code: null })
    return {status: 200, error: null}
  } catch (error) {
    console.error(error)
    return {status: 500, error}
  }
}

export const RecoverPasswordTrigger = https.onCall((data, context)=>recoverPassword(data,context))

