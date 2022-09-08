import { https } from 'firebase-functions';
import { auth } from "firebase-admin";
import { CreateUser, UpdateUser } from '../Models/Users/User';
import { setUser } from '../Users/users';


const updateUser = async (data:{userData: UpdateUser, uid: string}, context: https.CallableContext)=>{
  if(Object.keys(data).length < 4) return {status: 400, error: 'Data contains undefined value'}
  try {
    const {name, lastname, email, role } = data.userData;
    const updates:any = {};
    Object.keys({name, lastname, email, role }).forEach((key)=>{
      const value = {name, lastname, email, role }[key];

      if(value && key === name) updates.displayName = value;
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