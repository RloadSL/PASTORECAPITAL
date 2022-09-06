import { UserCredential , User as FireUser} from "firebase/auth";
import { CreateUser } from "../../infrastructure/dto/users.dto";
import { ErrorAuth } from "../../infrastructure/firebase/authentication.firebase";

export abstract class AuthenticationRepository {
  constructor() { };
  abstract signInEmailPassword(email: string, password: string): Promise<{userCredential: FireUser | null , error:  ErrorAuth | null}>;
  abstract signUp(data:CreateUser): Promise<{userCredential: FireUser | null , error:  ErrorAuth | null}>;
  abstract signOut(): Promise<void>;
  abstract recoverPass(email:string): Promise<{status:number, error: string | null}>;
  abstract onUserChange(callback?:Function):any;
}