import { firestore } from "firebase-admin";
import { User } from "../Models/Users/User";

export const setUser = async (uid:string, data:User): Promise<string | null>  =>{
  try {
    await firestore().collection('users').doc(uid).set(data, {merge: true});
    return null;
  } catch (error) {
    console.error(error);
    return error as string;
  } 
}

export const getUser = async (uid:string): Promise<any>  =>{
  try {
    const snap = await firestore().collection('users').doc(uid).get();
    return snap.data();
  } catch (error) {
    console.error(error);
    return error as string;
  } 
}

export const deleteUser = async (uid:string): Promise<string | null>  =>{
  try {
    await firestore().collection('users').doc(uid).delete();
    return null;
  } catch (error) {
    console.error(error);
    return error as string;
  } 
}

export const deleteUserFields = async (uid:string ,filds: any) => {
  Object.keys(filds).forEach(key => filds[key] = firestore.FieldValue.delete())
  await setUser(uid, filds)
}