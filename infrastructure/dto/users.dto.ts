export interface usersDTO {
  uid?:string,
  name?:string,
  email?: string,
  bornDate?: Date,
  role?: Role
}

export interface Role {
    level: number,
    label: string
}