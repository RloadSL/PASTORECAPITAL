import { FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore, CollectionReference } from 'firebase/firestore/lite';

export class FireFirestore{
  private _db:Firestore;
  constructor(app:FirebaseApp){
    this._db = getFirestore(app);
  }

  private _collection = (collectionPath:string):CollectionReference => collection(this._db, collectionPath);

  public getCollectionDocs = async (collectionPath:string) => {
    try {
      const collection = this._collection(collectionPath);
      const snapshot = await getDocs(collection);
      return snapshot
    } catch (error) {
      console.log(error)
      alert('Internal error firebase')
    }
   
  } 
}