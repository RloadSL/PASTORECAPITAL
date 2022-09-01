import { https } from 'firebase-functions';
import { auth } from "firebase-admin";
import { CreateUser } from '../Models/Users/User';
import { setUser } from '../Users/users';


const signUp = async (data:CreateUser, context: https.CallableContext)=>{
  if(Object.keys(data).length < 4) return {status: 400, error: 'Data contains undefined value'}
  try {
    const {full_name, email, password , role } = data;
    const userCredentials = await auth().createUser({
      displayName: full_name,
      email,
      password
    })
    
    await setUser(userCredentials.uid, {full_name, email, role })
    return {status: 200, error: null, uid: userCredentials.uid}
  } catch (error) {
    return {status: 500, error}
  }
}

export const SingUpTrigger = https.onCall((data, context)=>signUp(data,context))