export class Authentication {
  private static instance: Authentication;
  token?: string;

  private constructor() {}

  public static getInstance(): Authentication {
    if (!Authentication.instance) {
        Authentication.instance = new Authentication();
    }
    return Authentication.instance;
  }

  public login = (email:string, password:string)=>{

  }
}