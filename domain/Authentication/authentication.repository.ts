import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { User as FireUser} from "firebase/auth";
import { CreateUser } from "../../infrastructure/dto/users.dto";

export abstract class AuthenticationRepository {
  constructor() { };
  abstract signInEmailPassword(email: string, password: string): Promise<{userCredential: FireUser | null , error:  ErrorApp | null}>;
  abstract signUp(data:CreateUser): Promise<{userCredential: FireUser | null , error:  ErrorApp | null}>;
  abstract signOut(): Promise<void>;
  abstract recoverPass(email:string): Promise<{status:number, error: string | null}>;
  abstract onUserChange(callback?:Function):any;
}