import { IUser } from "./iuser";

export interface ISingleResponse {
  responseDate:Date
  response:IUser|null
  message:string
}
