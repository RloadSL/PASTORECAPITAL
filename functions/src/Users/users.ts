import { firestore } from "firebase-admin";
import { UpdateUser } from "../Models/Users/User";

export const setUser = async (uid:string, data:UpdateUser): Promise<string | null>  =>{
  try {
    await firestore().collection('users').doc(uid).set(data, {merge: true});
    return null;
  } catch (error) {
    return error as string;
  } 
}