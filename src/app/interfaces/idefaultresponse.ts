import { IUser } from "./iuser";

export interface IDefaultResponse {
  responseDate:Date;
  response:IUser|null
  message:string
}
