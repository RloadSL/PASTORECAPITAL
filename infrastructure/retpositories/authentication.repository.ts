import { UserCredential } from "firebase/auth";
import { AuthenticationRepository } from "../../domain/Authentication/authentication.repository";
import FireAuthentication, { ErrorAuth } from "../firebase/authentication.firebase";

export class AuthenticationRepositoryImplementation extends AuthenticationRepository {
  private _userLogged: UserCredential | null  = null;
  public get userLogged(): UserCredential | null{
    return this._userLogged;
  }
  async signInEmailPassword(email: string, password: string): Promise<{userCredential: UserCredential | null , error:  ErrorAuth | null}> {

    const response: any = await FireAuthentication.signInWithEmailAndPassword(email, password)
    if (!response.errorCode) { 
      this._userLogged = response;
      return {userCredential: this._userLogged, error : null}; 
    }
    else {
      return {userCredential: null, error : response}; ;
    }

  }
  signUp(): Promise<UserCredential> {
    throw new Error("Method not implemented.");
  }
  signOut(): Promise<UserCredential> {
    throw new Error("Method not implemented.");
  }
  recoverPass(): Promise<{ status: number; error: string | null; }> {
    throw new Error("Method not implemented.");
  }

}