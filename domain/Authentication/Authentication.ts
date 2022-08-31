import { UserCredential } from "firebase/auth";


export class Authentication {
  private static instance: Authentication;
  userLogged:UserCredential;

  private constructor(user:UserCredential) {
    this.userLogged = user;
  }

  static getInstance(user:UserCredential): Authentication {
    if (!Authentication.instance) {
        Authentication.instance = new Authentication(user);
    }
    return Authentication.instance;
  }
}

