import { ICharacter } from "./i-character"
import { ISpell } from "./ispell"
import { IUser } from "./iuser"

export interface IUserList {
  responseDate:Date
  response:IUser[]
  message:string
}
export interface ISpellList {
  responseDate:Date
  response:ISpell[]
  message:string
}
export interface ICharacterList {
  responseDate:Date
  response:ICharacter[]
  message:string
}
