import { FirebaseApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, Auth, UserCredential, signInWithEmailAndPassword } from "firebase/auth";

export class FireAuthentication {
  private _auth: Auth;
  constructor(app: FirebaseApp) {
    this._auth = getAuth(app);
  }

  private _parseError = (error: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return ({ errorCode, errorMessage })
  }

  public createUserWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this._auth, email, password);
      return userCredential;
    } catch (error: any) {
      console.error(this._parseError(error))
    }
  }

  public signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(this._auth, email, password)
      return userCredential;
    } catch (error: any) {
      console.error(this._parseError(error))
    }
  }
}