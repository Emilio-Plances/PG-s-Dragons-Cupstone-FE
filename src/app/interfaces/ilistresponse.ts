import { ISpell } from "./ispell"
import { IUser } from "./iuser"

export interface IListUser {
  responseDate:Date
  response:IUser[]
  message:string
}

export interface IListSpell {
  responseDate:Date
  response:ISpell[]
  message:string
}
