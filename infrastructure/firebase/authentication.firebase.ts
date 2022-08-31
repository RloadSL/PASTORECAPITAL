import { FirebaseApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, Auth, UserCredential, signInWithEmailAndPassword, AuthCredential } from "firebase/auth";
import FireFirebase  from "./firebase";
export interface ErrorAuth { errorCode: string, errorMessage:string }
class FireAuthentication {
  private static instance: FireAuthentication;
  private _auth: Auth;

  constructor(app: FirebaseApp) {
    this._auth = getAuth(app);
  }

  public static getInstance(app: FirebaseApp): FireAuthentication {
    if (!FireAuthentication.instance) {
      FireAuthentication.instance = new FireAuthentication(app);
    }

    return FireAuthentication.instance;
  }

  private _parseError = (error: any):ErrorAuth => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return ({ errorCode, errorMessage })
  }

  public createUserWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this._auth, email, password);
      return userCredential;
    } catch (error: any) {
      return this._parseError(error);
    }
  }

  public signInWithEmailAndPassword = async (email: string, password: string) => {
    try {

      AuthCredential
      const userCredential: UserCredential = await signInWithEmailAndPassword(this._auth, email, password)
      return userCredential;
    } catch (error: any) {
      return this._parseError(error);
    }
  }
}

export default  FireAuthentication.getInstance(FireFirebase.app)