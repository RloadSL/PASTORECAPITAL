
import { http } from "../http/http"
import { UserCredential } from "firebase/auth";
import { User } from "../../domain/User/User";
import { UserRepository } from "../../domain/User/user.repository";
import FireFirestore  from "../firebase/firestore.firebase";
import { CreateContextOptions } from "vm";
import { UserDto } from "infrastructure/dto/users.dto";
import { Unsubscribe } from "firebase/firestore";


export class UserRepositoryImplementation extends UserRepository {
 

  async read(uid: string): Promise<User | null> {
    const userSnap = await FireFirestore.getDoc('users',uid)
    if(userSnap?.exists()){
      const userData:any = {uid: userSnap?.id,...userSnap?.data()};
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

  async update(uid: string, data: any): Promise<void> {

  };
  
  async delete(uid: string): Promise<void> {
    
  };
}