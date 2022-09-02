
import { http } from "../http/http"
import { UserCredential } from "firebase/auth";
import { User } from "../../domain/User/User";
import { UserRepository } from "../../domain/User/user.repository";
import FireFirestore  from "../firebase/firestore.firebase";
import { CreateContextOptions } from "vm";


export class UserRepositoryImplementation extends UserRepository {
 

  async read(uid: string): Promise<User> {
    const userSnap = await FireFirestore.getDoc('users',uid)
    return new User({uid: userSnap?.id,...userSnap?.data()});
  };

  async onChange(uid:string): Promise<User> {
    return new User({uid});
  };

  async update(uid: string, data: any): Promise<void> {

  };
  async delete(uid: string): Promise<void> {
    
  };
}