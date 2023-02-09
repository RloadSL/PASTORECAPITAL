import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { User as FireUser } from "firebase/auth";
import { env } from "infrastructure/firebase/config";
import { AuthenticationRepository } from "../../domain/Authentication/authentication.repository";
import { CreateUser, Role } from "../dto/users.dto";
import FireAuthentication  from "../firebase/authentication.firebase";
import { FireFunctions, FireFunctionsInstance } from "../firebase/functions.firebase";
import { getCookies, setCookie, deleteCookie } from 'cookies-next';

/**
 * Implementación del repositorio de Authenticación basado en Firebase Authentication.
 * Esta clase es un siglenton.
 */
class AuthenticationRepositoryImplementation extends AuthenticationRepository {
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
  /**
   * Autenticación en Firebase Authentication vía email y password.
   * @param email Usuario del sistema previamente validado por yup
   * @param password Usuario del sistema previamente validado por yup
   * @returns Promesa con los resultados de la operación
   */
  async signInEmailPassword(email: string, password: string): Promise<{ userCredential: FireUser | null, error: ErrorApp | null }> {
    const response: any = await FireAuthentication.signInWithEmailAndPassword(email, password)
    if (!response.errorCode) {
      this._userLogged = response;
      return { userCredential: this._userLogged, error: null };
    }
    else {
      return { userCredential: null, error: response };
    }

  }
  /**
   * Autenticación en Firebase Authentication vía email y password.
   * @returns Promesa con los resultados de la operación
   */
   async getWordpressToken(uid:string): Promise<{ wp_token:string | null, error: ErrorApp | null }> {
    const response:any = await FireFunctionsInstance.onCallFunction('GetWpTokenTriggerFunctions', {uid, env: env});
    return response;
  }
  /**
   * Crear nuevo usuario en Firebase Authentication y Firestore 
   * @param data Datos del usuario necesarios para crear no nuevo
   * @returns Promesa con los resultados de la operación
   */
  async signUp(data: CreateUser): Promise<{ userCredential: FireUser | null, error: any }> {
    try {
      const role: Role = {
        level: 0,
        label: 'User',
        key: 'user'
      }
      const response = await FireFunctions.getInstance().onCallFunction('SingUpOnCallFunctions', { ...data, role });
      if (response.status === 200) {
        const signInEmailPassword = await this.signInEmailPassword(data.email, data.password)
       
        if (signInEmailPassword.userCredential) return { userCredential: this._userLogged, error: null };
        else return { userCredential: this._userLogged, error: signInEmailPassword.error };
      } else {
        return { userCredential: null, error: {errorCode:response.error.errorInfo.code, message: response.error.errorInfo.message} };
      }
    } catch (error) {
      return { userCredential: null, error: error };
    }
  }

  async updateUserAuthenticationData(data:{uid: string, name:string, lastname:string, email:string }){
    const response:any = await FireFunctionsInstance.onCallFunction('UpdateUserAuthenticationFunctions', data);
    return response;
  }

  /**
   * Es un listener de los cambios de estado del usuario de Firebase Authentication.
   * @param callback Tarea a ejecutar cuando se produsca un cambio de estado
   */
  onUserChange(callback:Function) {
    FireAuthentication.onChange( async (user: FireUser) => {
      let wpAuth:any;
      if(user){
        this._userLogged = user;
        this._logged = true;
        wpAuth = await this.getWordpressToken(user.uid)
      }
      
      if (callback) {
        if(wpAuth?.UserData) setCookie('user-data', wpAuth?.UserData);
        else deleteCookie('user-data')
        callback(user ?  {uid: user.uid, extradata: {wpToken: wpAuth.wp_token, userDataToken: wpAuth.UserData}} : null)
      }
    })
  }
  /**
   * Deslogarse de la aplicación
   */
  async signOut(): Promise<void> {
    await FireAuthentication.signOut()
    this._logged = false;
    this._userLogged = null;
  }
 
    /**
     * Envía un código de 4 caracteres al correo correspondiente si el usuario existe.
     * @param data Email para enviar el codigo
     * @returns 
     */
   async sendSecurityCode(data: {email: string}): Promise<any> {
    try {
      const response = await FireFunctions.getInstance().onCallFunction('SendSecurityCodeFunctions', data);
     
      if(response.status === 200){
        return {state: 'waiting' , error: null};
      }else{
        return {state: 'init' , error: new ErrorApp({errorCode: response.error, errorMessage: response.error},'error')};;
      }
    } catch (error) {
      return { userCredential: null, error: error };
    }
  }

  /**
   * Valida el código enviado previamente teniendo en cuanta un dia de expiración
   * @param data.email Email previamente seteado por el paso anterior  
   * @returns 
   */
  async validateCode(data: {code: number, email:string}): Promise<any> {
    try {
      const response = await FireFunctions.getInstance().onCallFunction('ValidateSecurityCodeTriggerFunctions', data);
      if(response.status === 200){
        return {state: 'validated' , error: null};
      }else{
        return {state: 'waiting' , error: new ErrorApp({errorCode: response.error, errorMessage: response.error}, 'error')};;
      }
    } catch (error) {
      return { userCredential: null, error: error };
    }
  }
  /**
   * 
   * Setea el password del usuario.
   * @returns 
   */
  async recoverPass(data:{email: string, newPassword:string}): Promise<any> {
    try {
      const response = await FireFunctions.getInstance().onCallFunction('RecoverPasswordTriggerFunctions', data);
      console.log('recoverPass',response)
      if(response.status === 200){
        return {state: 'redirect' , error: null};
      }else{
        return {state: 'init' , error: new ErrorApp({errorCode: response.error, errorMessage: response.error}, 'error')};;
      }
    } catch (error) {
      return { userCredential: null, error: error };
    }
  }
}

export const AuthImplInstance = AuthenticationRepositoryImplementation.getInstance();