import { Role } from "./Role";

export interface User {
  uid?:string,
  name?:string,
  lastname?:string,
  email?:string,
  role?: Role,
  disabled?: boolean,
  security_code?: {code : number, created_at: Date}
}

export interface CreateUser {
  name?:string,
  lastname?:string,
  password:string,
  email:string,
  role: Role
}