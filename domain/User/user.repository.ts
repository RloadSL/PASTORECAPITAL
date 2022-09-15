import { UserCredential } from "firebase/auth";
import { User } from "./User";

export abstract class UserRepository {
  constructor() { };
  //abstract create(userData: usersDTO): Promise<User>;
  abstract read(uid: string, extradata?: {webToken:string}): Promise<User | null>;
  abstract update(uid:string, data:any): Promise<void>;
  abstract delete(uid:string): Promise<void>;
}