import { FirebaseApp, initializeApp } from 'firebase/app';
import { FireFirestore } from './firestore.firebase';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPb1QBfFxKTvKa_23PRKphjqrHMC_rAjs",
  authDomain: "pastore-capital.firebaseapp.com",
  projectId: "pastore-capital",
  storageBucket: "pastore-capital.appspot.com",
  messagingSenderId: "192578028738",
  appId: "1:192578028738:web:4918791df93330382ce75b",
  measurementId: "G-Y85DCVKRSF"
};


class FireFirebase {
  private static instance: FireFirebase;
  private _app: FirebaseApp;

  public get app(): FirebaseApp {
    return this._app;
  }

  private constructor() {
    this._app = initializeApp(firebaseConfig);

  }

  public static getInstance(): FireFirebase {
    if (!FireFirebase.instance) {
      FireFirebase.instance = new FireFirebase();
    }
    return FireFirebase.instance;
  }
}

export default FireFirebase.getInstance();