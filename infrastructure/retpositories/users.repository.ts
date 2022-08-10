
import { usersDTO } from "../dto/users.dto"
import { http } from "../http/http"
import { UserCredential } from "firebase/auth";
import { User } from "../../domain/User/User";
import { UserRepository } from "../../domain/User/user.repository";
import FireFirestore  from "../firebase/firestore.firebase";


export class UserRepositoryImplementation extends UserRepository {
  async create(userData: usersDTO): Promise<User> {
    if(!userData.uid) return new User(); // retorna un usuario invitado

    await FireFirestore.setDoc('users',userData.uid ,userData)
    return new User(userData);
  };

  async read(userCredential: UserCredential): Promise<User> {
    const uid = userCredential.user.uid
    const userSnap = await FireFirestore.getDoc('users',uid)
    return new User(userSnap?.data());
  };

  async onChange(uid:string): Promise<User> {
    return new User();
  };

  async update(uid: string, data: any): Promise<void> {

  };
  async delete(uid: string): Promise<void> {
    
  };
}