import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { FirebaseApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged ,Auth, UserCredential, signInWithEmailAndPassword, AuthCredential, connectAuthEmulator, signOut } from "firebase/auth";
import FireFirebase  from "./firebase";
export interface ErrorAuth { errorCode: string, errorMessage:string }
/**
 * Implementación de la integración del módulo de Authentication de Firebase 
 */
class FireAuthentication {
  private static instance: FireAuthentication;
  private _auth: Auth;

  private constructor(app: FirebaseApp) {
    this._auth = getAuth(app);
    if(FireFirebase.emulatiorEnable){
      connectAuthEmulator(this._auth, "http://localhost:9099");
    }
  }

  public static getInstance(app: FirebaseApp): FireAuthentication {
    if (!FireAuthentication.instance) {
      FireAuthentication.instance = new FireAuthentication(app);
    }

    return FireAuthentication.instance;
  }

  private _parseError = (error: any):ErrorApp => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return (new ErrorApp({ errorCode, errorMessage }, 'error'))
  }

  public createUserWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this._auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      return this._parseError(error);
    }
  }

  public signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      AuthCredential
      const userCredential: UserCredential = await signInWithEmailAndPassword(this._auth, email, password)
      return userCredential.user;
    } catch (error: any) {
      return this._parseError(error);
    }
  }

  public signOut = async ():Promise<void | ErrorApp> => {
    try {
      await signOut(this._auth);
    } catch (error: any) {
      return this._parseError(error);
    }
  }

  public onChange = (callback:Function) => onAuthStateChanged(this._auth, (user)=>{
    callback(user);
  })
}

export default  FireAuthentication.getInstance(FireFirebase.app)