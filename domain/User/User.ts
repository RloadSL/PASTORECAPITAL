import { Timestamp } from "firebase/firestore";
import { Role, Subscription, UserDto } from "infrastructure/dto/users.dto"
import { UserRepositoryImplInstance } from "infrastructure/repositories/users.repository";
import { wpToken } from "ui/utils/test.data";
import { UserRepository } from "./user.repository";

//[permissions.consultant] esto es para validadr el permiso en Academy
export type COLLABORATION_MODULES = 'permissions.consultant' | 'RESEARCH' | 'permissions.consultant' | 'WEBINARS' | 'AMAS'
export class User {
  /**
   * Identificador del usuario para los usuarios invitados el [uid = not-logged]
   */
  uid: string;
  

  created_at?: Date;
  

  collaboration?: any;


  name: string;
  
  lastname: string;
 

  email: string;
 

  role: Role;
  

  subscription: Subscription;
  

  edition_section: Array<string> | undefined;
  


  wpToken: string | undefined;
 

  userDataToken: string | undefined;
 

  stripe_cu_id?:string;

  get fullname(){ return `${this.name} ${this.lastname}`};

  constructor(userData: UserDto) {
    this.uid = userData.uid;
    this.email = userData.email;
    this.lastname = userData.lastname;
    this.name = userData.name;
    this.role = userData.role;
    this.wpToken = userData.wpToken || (userData.role.level > 1 ?  wpToken : undefined);
    this.subscription = userData.subscription
    this.edition_section = userData.edition_section
    this.userDataToken = userData.userDataToken
    this.created_at = userData.created_at instanceof Timestamp ? userData.created_at?.toDate() :  userData.created_at
    this.collaboration = userData.collaboration
    this.stripe_cu_id = userData.stripe_cu_id
  }

  public toJson = (): UserDto => ({
    uid: this.uid,
    email: this.email,
    lastname: this.lastname,
    name: this.name,
    role: this.role,
    wpToken: this.wpToken,
    subscription: this.subscription,
    edition_section: this.edition_section,
    created_at: this.created_at,
    collaboration: this.collaboration,
    stripe_cu_id: this.stripe_cu_id
  });

 onChange = (callback:Function)=>{
    return UserRepositoryImplInstance.onChange(this.uid, callback)
  }

 onChangeNotifications = (callback:Function)=>{
    return UserRepositoryImplInstance.onChangeNotification(this.uid, callback)
  }

 checkNotifications = (callback:Function)=>{
    return UserRepositoryImplInstance.onChangeNotification(this.uid, callback)
  }

  setPersonalStats = async (data:any)=>{
    await UserRepositoryImplInstance.setPersonalStats(this.uid, data)
  }

  checkColaborationPermisionByModule(module:COLLABORATION_MODULES):boolean{
    if(this.role.level > 1) return true
    if(this.role.level < 1) return false;
    return this.collaboration ?  this.collaboration['permissions.'+module] != undefined : false;
  }

}