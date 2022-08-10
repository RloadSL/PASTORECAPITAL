import { UserCredential } from "firebase/auth";
import { usersDTO } from "../../infrastructure/dto/users.dto";
import { User } from "./User";

export abstract class UserRepository {
  constructor() { };
  abstract create(userData: usersDTO): Promise<User>;
  abstract read(userCredential: UserCredential): Promise<User>;
  abstract update(uid:string, data:any): Promise<void>;
  abstract delete(uid:string): Promise<void>;
}