import { Role, UserDto } from "infrastructure/dto/users.dto"

export class User {
  private _uid: string;
  public get uid(): string {
    return this._uid;
  }
  
  private _fullName: string;
  public get fullName(): string {
    return this._fullName;
  }

  private _email: string;
  public get email(): string {
    return this._email;
  }
 
  private _role: Role;
  public get role(): Role {
    return this._role;
  }
 
  constructor(userData:UserDto) {
    this._uid = userData.uid;
    this._email = userData.email;
    this._fullName = userData.full_name;
    this._role = userData.role;
  }

  public toJson = ():UserDto => ({
    uid: this._uid,
    email: this._email,
    full_name : this._fullName,
    role: this._role
  });
}