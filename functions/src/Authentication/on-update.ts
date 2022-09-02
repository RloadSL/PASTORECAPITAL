import { https } from 'firebase-functions';
import { auth } from "firebase-admin";
import { CreateUser, UpdateUser } from '../Models/Users/User';
import { setUser } from '../Users/users';


const updateUser = async (data:{userData: UpdateUser, uid: string}, context: https.CallableContext)=>{
  if(Object.keys(data).length < 4) return {status: 400, error: 'Data contains undefined value'}
  try {
    const {full_name, email, role } = data.userData;
    const updates:any = {};
    Object.keys({full_name, email, role }).forEach((key)=>{
      const value = {full_name, email, role }[key];
      if(value && key === full_name) updates.displayName = value;
      if(value && key === email) updates.email = value;
    })
    const userCredentials = await auth().updateUser(data.uid , updates)
    
    await setUser(userCredentials.uid, data.userData)
    return {status: 200, error: null, uid: userCredentials.uid}
  } catch (error) {
    return {status: 500, error}
  }
}

export const UpdateUserTrigger = https.onCall((data, context)=>updateUser(data,context))