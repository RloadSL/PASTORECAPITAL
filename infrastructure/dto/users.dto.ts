import { Timestamp } from "firebase/firestore"

export interface UpdateUser {
  name?:string,
  lastname?:string,
  email?:string,
  role?: Role,
  collaboration?:any
}

export interface CreateUser {
  name:string,
  lastname:string,
  password:string,
  email:string,
  role: Role
}

export interface UserDto {
  uid:string,
  name:string,
  lastname:string,
  email:string,
  role: Role,
  created_at?: Timestamp | Date,
  default_lang?: 'es' | 'en',
  /**
   * Token para poder editar en el headless de wordpress si eres administrador
   */
  wpToken?: string,
  /**
   * Datos del usuario encryptados para enviarlo al wp
   */
  userDataToken?: string,
  /**
   * Plan del usuario
   */
  subscription: Subscription,
  /**
   * Urls donde un administrador tendrá opción de edición
   */
  edition_section? : Array<string>,
  /**
   * Permisos asignados de un colaborador
   */
  collaboration?: any,
  stripe_cu_id?:string
}

export interface Role {
  level : 0 | 1 | 2,
  label: 'User' | 'Collaborator' | 'Administrator',
  key: 'user' | 'collaborator' | 'administrator'
}

export interface Subscription {
  updated_at : Date,
  created_at : Date,
  stripe_sub_id?:string,
  plan: {
    label: 'Guest' | 'Basic' | 'Plus' | 'Premium',
    key: 'guest' | 'basic' | 'plus' | 'premium',
    level: 0 | 1 | 2 | 3
  }
}