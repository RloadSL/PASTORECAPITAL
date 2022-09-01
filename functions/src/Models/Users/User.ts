import { Role } from "./Role";

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