import { User as FireUser, UserCredential } from "firebase/auth";
import { AuthenticationRepository } from "../../domain/Authentication/authentication.repository";
import { CreateUser, Role } from "../dto/users.dto";
import FireAuthentication, { ErrorAuth } from "../firebase/authentication.firebase";
import { FireFunctions } from "../firebase/functions.firebase";

/**
 * Implementación del repositorio de Authenticación basado en Firebase Authentication.
 * Esta clase es un siglenton.
 */
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
  /**
   * Autenticación en Firebase Authentication vía email y password.
   * @param email Usuario del sistema previamente validado por yup
   * @param password Usuario del sistema previamente validado por yup
   * @returns Promesa con los resultados de la operación
   */
  async signInEmailPassword(email: string, password: string): Promise<{ userCredential: FireUser | null, error: ErrorAuth | null }> {
    const response: any = await FireAuthentication.signInWithEmailAndPassword(email, password)
    if (!response.errorCode) {
      this._userLogged = response.user;
      return { userCredential: this._userLogged, error: null };
    }
    else {
      return { userCredential: null, error: response };
    }

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
  /**
   * Es un listener de los cambios de estado del usuario de Firebase Authentication.
   * @param callback Tarea a ejecutar cuando se produsca un cambio de estado
   */
  onUserChange(callback:Function) {
    FireAuthentication.onChange((user: FireUser) => {
      this._userLogged = user;
      this._logged = true;
      if (callback) {
        callback(user)
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
   * Recuperar contraseña mediante email.
   */
  recoverPass(email:string): Promise<{ status: number; error: string | null; }> {
    throw new Error("Method not implemented.");
  }

}