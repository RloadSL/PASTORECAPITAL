import { User as FireUser, UserCredential } from "firebase/auth";
import { AuthenticationRepository } from "../../domain/Authentication/authentication.repository";
import { CreateUser, Role } from "../dto/users.dto";
import FireAuthentication, { ErrorAuth } from "../firebase/authentication.firebase";
import { FireFunctions } from "../firebase/functions.firebase";

export class AuthenticationRepositoryImplementation extends AuthenticationRepository {
  private static instance: AuthenticationRepositoryImplementation

  private constructor(){
    super();
  }

  public static getInstance(): AuthenticationRepositoryImplementation {
    if (!AuthenticationRepositoryImplementation.instance) {
      AuthenticationRepositoryImplementation.instance = new AuthenticationRepositoryImplementation();
    }

    return AuthenticationRepositoryImplementation.instance;
  }

  private _logged: boolean = false;
  public get logged(): boolean {
    return this._logged;
  }
  private _userLogged: FireUser | null = null;
  public get userLogged(): FireUser | null {
    return this._userLogged;
  }
  async signInEmailPassword(email: string, password: string): Promise<{ userCredential: FireUser | null, error: ErrorAuth | null }> {
    const response: any = await FireAuthentication.signInWithEmailAndPassword(email, password)
    if (!response.errorCode) {
      this._userLogged = response.user;
      return { userCredential: this._userLogged, error: null };
    }
    else {
      return { userCredential: null, error: response.errorCode };;
    }

  }
  async signUp(data: CreateUser): Promise<{ userCredential: FireUser | null, error: any }> {
    try {
      const role: Role = {
        level: 0,
        label: 'Guest'
      }
      const response = await FireFunctions.getInstance().onCallFunction('SingUpOnCallFunctions', { ...data, role });
      if (response.status === 200) {
        const signInEmailPassword = await this.signInEmailPassword(data.email, data.password)
        if (signInEmailPassword.userCredential) return { userCredential: this._userLogged, error: null };
        else return { userCredential: this._userLogged, error: signInEmailPassword.error };
      } else {
        return { userCredential: null, error: response.error };
      }
    } catch (error) {
      return { userCredential: null, error: error };
    }
  }

  onUserChange(callback:Function) {
    FireAuthentication.onChange((user: FireUser) => {
      this._userLogged = user;
      this._logged = true;
      if (callback) {
        callback(user)
      }
    })
  }

  signOut(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  recoverPass(): Promise<{ status: number; error: string | null; }> {
    throw new Error("Method not implemented.");
  }

}