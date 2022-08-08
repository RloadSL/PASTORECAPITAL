import { FirebaseApp, initializeApp } from 'firebase/app';
import { FireFirestore } from './firestore.firebase';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};


export class Firebase {
  private static instance: Firebase;
  private _app:FirebaseApp;
  public firestore:FireFirestore;

  private constructor(){
    this._app = initializeApp(firebaseConfig);
    this.firestore = new FireFirestore(this._app);
  }

  public static getInstance(): Firebase {
    if (!Firebase.instance) {
        Firebase.instance = new Firebase();
    }
    return Firebase.instance;
  }

  
} 