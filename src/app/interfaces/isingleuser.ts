import { IUser } from "./iuser";

export interface ISingleUser {
  responseDate:Date
  response:IUser|null
  message:string
}