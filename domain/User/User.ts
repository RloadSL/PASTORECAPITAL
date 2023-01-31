import { Timestamp } from "firebase/firestore";
import { Role, Subscription, UserDto } from "infrastructure/dto/users.dto"

export class User {
  private _uid: string;
  public get uid(): string {
    return this._uid;
  }

  private _created_at?: Date;
  public get created_at(): Date | undefined {
    return this._created_at;
  }

  private _collaboration?: any;
  public get collaboration(): any | undefined {
    return this._collaboration;
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

  private _userDataToken: string | undefined;
  public get userDataToken(): string | undefined {
    return this._userDataToken;
  }

  stripe_cu_id?:string;

  constructor(userData: UserDto) {
    this._uid = userData.uid;
    this._email = userData.email;
    this._lastname = userData.lastname;
    this._name = userData.name;
    this._role = userData.role;
    this._wpToken = userData.wpToken;
    this._subscription = userData.subscription
    this._edition_section = userData.edition_section
    this._userDataToken = userData.userDataToken
    this._created_at = userData.created_at instanceof Timestamp ? userData.created_at?.toDate() :  userData.created_at
    this._collaboration = userData.collaboration
    this.stripe_cu_id = userData.stripe_cu_id
  }

  public toJson = (): UserDto => ({
    uid: this._uid,
    email: this._email,
    lastname: this._lastname,
    name: this._name,
    role: this._role,
    wpToken: this._wpToken,
    subscription: this._subscription,
    edition_section: this._edition_section,
    created_at: this._created_at,
    collaboration: this.collaboration,
    stripe_cu_id: this.stripe_cu_id
  });
}