import { usersDTO } from "../../infrastructure/dto/users.dto";

export class User {
  private static instance: User;
  constructor(userData?:usersDTO) {
    if(userData?.uid){
      console.log('Usuario creado correctamente')
    }else{
      console.log('Usuario sin crear')
    }
  }

  public static getInstance(userData?:usersDTO): User {
    if (!User.instance) {
        User.instance = new User(userData);
    }
    return User.instance;
  }
}