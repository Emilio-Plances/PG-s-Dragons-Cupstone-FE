import { Role } from "./enum"

export interface IUser {
  id: number
  username: string
  publicUsername:string
  email: string
  name: string
  surname: string
  birthday: Date|null
  info: string|null
  linkPhoto: string|null
  role: Role
}

