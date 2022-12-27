import { Role } from "infrastructure/dto/users.dto"


export const ADMINISTRATOR: Role = {
  key: 'administrator',
  label: 'Administrator',
  level: 2
}
export const USER : Role= {
  key: 'user',
  label: 'User',
  level: 0
}

export const COLLABORATOR : Role = {
  key: 'collaborator',
  label: 'Collaborator',
  level: 1
}
export const ROLES : Role[] = [
  USER,
  COLLABORATOR,
  ADMINISTRATOR
]