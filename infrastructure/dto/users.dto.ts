export interface UpdateUser {
  full_name?:string,
  email?:string,
  role?: Role
}

export interface CreateUser {
  full_name:string,
  password:string,
  email:string,
  role: Role
}

export interface Role {
  level : 0 | 1 | 2 | 3 | 4 | 5,
  label: 'Guest' | 'Basic' | 'Plus' | 'Premium' | 'Module Administrator' | 'Administrador'
}