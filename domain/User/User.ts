import { Role, UserDto } from "infrastructure/dto/users.dto"

export class User {
  private _uid: string;
  public get uid(): string {
    return this._uid;
  }
  
  private _name: string;
  public get name(): string {
    return this._name;
  }
  private _lastname: string;
  public get lastname(): string {
    return this.lastname;
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
    this._lastname = userData.lastname;
    this._name = userData.name;
    this._role = userData.role;
  }

  public toJson = ():UserDto => ({
    uid: this._uid,
    email: this._email,
    lastname : this._lastname,
    name : this._name,
    role: this._role
  });
}