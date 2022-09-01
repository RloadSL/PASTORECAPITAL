import { UserCredential } from "firebase/auth";
import { CreateUser } from "../../infrastructure/dto/users.dto";
import { ErrorAuth } from "../../infrastructure/firebase/authentication.firebase";

export abstract class AuthenticationRepository {
  constructor() { };
  abstract signInEmailPassword(email: string, password: string): Promise<{userCredential: UserCredential | null , error:  ErrorAuth | null}>;
  abstract signUp(data:CreateUser): Promise<{userCredential: UserCredential | null , error:  ErrorAuth | null}>;
  abstract signOut(): Promise<UserCredential>;
  abstract recoverPass(): Promise<{status:number, error: string | null}>;
  abstract onUserChange():any;
}