
interface UserData {
  fullName: string,
  role: {
    label: string,
    level: number
  }
}

export class User {
  private static instance: User;
  fullName: string;

  constructor(userData: UserData) {
    this.fullName = userData.fullName;
  }

  public static getInstance(userData:UserData): User {
    if (!User.instance) {
        User.instance = new User(userData);
    }

    return User.instance;
  }

  
}