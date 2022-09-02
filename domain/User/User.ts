
export class User {
  private static instance: User;
  constructor(userData:any) {
    if(userData?.uid){
      console.log('Usuario creado correctamente')
    }else{
      console.log('Usuario sin crear')
    }
  }

  public static getInstance(userData:any): User {
    if (!User.instance) {
        User.instance = new User(userData);
    }
    return User.instance;
  }
}