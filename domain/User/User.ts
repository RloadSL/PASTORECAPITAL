import { Role, Subscription, UserDto } from "infrastructure/dto/users.dto"

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
    return this._lastname;
  }

  private _email: string;
  public get email(): string {
    return this._email;
  }

  private _role: Role;
  public get role(): Role {
    return this._role;
  }

  private _subscription: Subscription;
  public get subscription(): Subscription {
    return this._subscription;
  }

  private _edition_section: Array<string> | undefined;
  public get edition_section(): Array<string> | undefined {
    return this._edition_section;
  }


  private _wpToken: string | undefined;
  public get wpToken(): string | undefined {
    return this._wpToken;
  }

  constructor(userData: UserDto) {
    this._uid = userData.uid;
    this._email = userData.email;
    this._lastname = userData.lastname;
    this._name = userData.name;
    this._role = userData.role;
    this._wpToken = userData.wpToken;
    this._subscription = userData.subscrition
    this._edition_section = userData.edition_section
  }

  public toJson = (): UserDto => ({
    uid: this._uid,
    email: this._email,
    lastname: this._lastname,
    name: this._name,
    role: this._role,
    wpToken: this._wpToken,
    subscrition: this._subscription,
    edition_section: this._edition_section
  });
}