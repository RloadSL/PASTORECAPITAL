import { UserCredential } from "firebase/auth";
import { AuthenticationRepository } from "../../domain/Authentication/authentication.repository";
import { CreateUser } from "../dto/users.dto";
import FireAuthentication, { ErrorAuth } from "../firebase/authentication.firebase";
import { FireFunctions } from "../firebase/functions.firebase";

export class AuthenticationRepositoryImplementation extends AuthenticationRepository {
  private _logged:boolean = false;
  public get logged(): boolean{
    return this._logged;
  }
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
  async signUp(data:CreateUser): Promise<{userCredential: UserCredential | null , error:  any}> {
   try {
    const response = await FireFunctions.getInstance().onCallFunction('SingUpOnCallFunctions');
    console.log('auth@signUpEmailPassword', response)
    if(response.status === 200){
      const  signInEmailPassword = await this.signInEmailPassword(data.email, data.password)
      if(signInEmailPassword.userCredential) return {userCredential: this._userLogged, error : null};
      else return {userCredential: this._userLogged, error : signInEmailPassword.error};
    }else{
      return {userCredential: null, error : response.error};
    }
   } catch (error) {
      return {userCredential: null, error : error};
   }
  }

  onUserChange() {
      FireAuthentication.onChange((user:UserCredential)=>{
        this._userLogged = user;
        this._logged = true;
      })
  }

  signOut(): Promise<UserCredential> {
    throw new Error("Method not implemented.");
  }
  recoverPass(): Promise<{ status: number; error: string | null; }> {
    throw new Error("Method not implemented.");
  }

}