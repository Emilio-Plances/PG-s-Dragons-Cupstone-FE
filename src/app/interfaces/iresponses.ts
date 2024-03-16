import { ICharacter } from "./i-character";
import { ISpell } from "./ispell";
import { IUser } from "./iuser";

export interface IUserResponse {
  responseDate:Date
  response:IUser
  message:string
}
export interface ISpellResponse {
  responseDate:Date
  response:ISpell
  message:string
}
export interface ICharacterResponse {
  responseDate:Date
  response:ICharacter
  message:string
}
export interface IUserAuth {
  loginDate:Date,
  token:string,
  user:IUser
}

