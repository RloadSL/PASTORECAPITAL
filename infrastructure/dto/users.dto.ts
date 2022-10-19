export interface UpdateUser {
  name:string,
  lastname:string,
  email?:string,
  role?: Role
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
  /**
   * Token para poder editar en el headless de wordpress si eres administrador
   */
  wpToken?: string,
  /**
   * Plan del usuario
   */
  subscrition?: Subscription,
  /**
   * Urls donde un administrador tendrá opción de edición
   */
  edition_section? : Array<string>,
}

export interface Role {
  level : 0 | 1 | 2,
  label: 'User' | 'Colaborator' | 'Administrador',
  key: 'user' | 'colaborator' | 'administrador'
}

export interface Subscription {
  updated_at : Date,
  created_at : Date,
  last_innvoice?: string,
  plan: {
    label: 'Guest' | 'Basic' | 'Plus' | 'Premium',
    level: 0 | 1 | 2 | 3
  }
}