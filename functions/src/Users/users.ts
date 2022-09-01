import { firestore } from "firebase-admin";
import { UpdateUser } from "../Models/Users/User";

export const setUser = async (uid:string, data:UpdateUser)=>{
  try {
    await firestore().collection('users').doc(uid).set(data, {merge: true});
    return;
  } catch (error) {
    return error;
  } 
}