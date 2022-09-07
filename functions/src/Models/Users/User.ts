import { Role } from "./Role";

export interface UpdateUser {
  name?:string,
  lastname?:string,
  email?:string,
  role?: Role,
  disabled?: boolean
}

export interface CreateUser {
  name?:string,
  lastname?:string,
  password:string,
  email:string,
  role: Role
}