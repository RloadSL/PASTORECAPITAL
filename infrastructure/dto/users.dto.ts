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
  wp_token?: string
}

export interface Role {
  level : 0 | 1 | 2 | 3 | 4 | 5,
  label: 'Guest' | 'Basic' | 'Plus' | 'Premium' | 'Module Administrator' | 'Administrador'
}