import { FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, Firestore, CollectionReference, doc, DocumentReference, setDoc, connectFirestoreEmulator} from 'firebase/firestore/lite';
import { onSnapshot, Unsubscribe } from "firebase/firestore";

import FireFirebase from './firebase';

export class FireFirestore {
  private _db: Firestore;
  private static instance: FireFirestore;
  private constructor(app: FirebaseApp) {
    this._db = getFirestore(app);
    if(FireFirebase.emulatiorEnable){
      connectFirestoreEmulator(this._db, 'localhost', 8080);
    }
  }
  public static getInstance(app: FirebaseApp): FireFirestore {
    if (!FireFirestore.instance) {
      FireFirestore.instance = new FireFirestore(app);
    }

    return FireFirestore.instance;
  }
  private _collection = (collectionPath: string): CollectionReference => collection(this._db, collectionPath);
  private _doc = (collectionPath: string, docId:string): DocumentReference => doc(this._db, collectionPath, docId);

  public getCollectionDocs = async (collectionPath: string) => {
    try {
      const collection = this._collection(collectionPath);
      const snapshot = await getDocs(collection);
      return snapshot
    } catch (error) {
      console.log(error)
      alert('Internal error firebase')
    }

  }
  public getDoc = async (collectionPath: string, docId: string) => {
    try {
      const docRef = this._doc(collectionPath, docId);
      const snapshot = await getDoc(docRef);
      return snapshot
    } catch (error) {
      console.log(error)
      alert('Internal error firebase')
    }
  }

  public setDoc = async (collectionPath: string, docId: string, data:any) => {
    try {
      const docRef = this._doc(collectionPath, docId);
      await setDoc(docRef, data);
    } catch (error) {
      console.log(error)
      alert('Internal error firebase')
    }
  }

  public onChangeDoc = (path:string, callback:Function):Unsubscribe => {
    const unsub = onSnapshot(doc(this._db, path), (doc) => {
      if(doc.exists())
        callback({...doc.data, id: doc.id});
    });
  return unsub
  } 
}

export default FireFirestore.getInstance(FireFirebase.app)