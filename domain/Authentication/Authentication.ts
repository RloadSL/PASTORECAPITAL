import { AuthenticationRepositoryImplementation } from "../../infrastructure/retpositories/authentication.repository";
import { User } from "../User/User";

export class Authentication extends AuthenticationRepositoryImplementation {
  
  private static instance: Authentication;
  private constructor() {
    super();
  }

  public static getInstance(): Authentication {
    if (!Authentication.instance) {
        Authentication.instance = new Authentication();
    }
    return Authentication.instance;
  }

}

