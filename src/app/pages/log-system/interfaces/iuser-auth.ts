import { IUser } from "./iuser";

export interface IUserAuth {
  loginDate:Date,
  token:string,
  user:IUser
}
