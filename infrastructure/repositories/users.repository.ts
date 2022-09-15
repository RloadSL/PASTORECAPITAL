

import { User } from "../../domain/User/User";
import { UserRepository } from "../../domain/User/user.repository";
import FireFirestore  from "../firebase/firestore.firebase";
import { UpdateUser, UserDto } from "infrastructure/dto/users.dto";
import { Unsubscribe } from "firebase/firestore";
/**
 * Implementación de los casos de usos para los usuarios de la plataforma
 */
class UserRepositoryImplementation extends UserRepository {
  private static instance: UserRepositoryImplementation;
  public static getInstance(): UserRepositoryImplementation {
    if (!UserRepositoryImplementation.instance) {
      UserRepositoryImplementation.instance = new UserRepositoryImplementation();
    }

    return UserRepositoryImplementation.instance;
  }
  async read(uid: string, extradata?: {webToken:string}): Promise<User | null> {
    const userSnap = await FireFirestore.getDoc('users',uid)
    if(userSnap?.exists()){
      let userData:any = {uid: userSnap?.id,...userSnap?.data()};
      if(extradata) userData = {...userData, ...extradata};
      return new User(userData as UserDto);
    }else{
      return null;
    }
  }; 
  
  onChange(uid:string, callback:Function): Unsubscribe {
    return FireFirestore.onChangeDoc(`users/${uid}`, (userData:UserDto)=>{
      callback(new User(userData));
    })
  };

  async update(uid: string, data: UpdateUser): Promise<void> {
    try {
      await FireFirestore.setDoc('users',uid, data)
    } catch (error) {
      console.error(error)
      alert('Error inteno en user.repository')
    }
  };
  
  async delete(uid: string): Promise<void> {
    try {
      await FireFirestore.deleteDoc('users',uid)
    } catch (error) {
      console.error(error)
      alert('Error inteno en user.repository')
    }
  };
}

export const UserRepositoryImplInstance = UserRepositoryImplementation.getInstance()