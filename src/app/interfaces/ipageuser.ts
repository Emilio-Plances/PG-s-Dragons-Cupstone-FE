import { IPage } from "./ipage"
import { IUser } from "./iuser"

export interface IPageUser {
  responseDate:Date
  response:IContent
  message:string
}
interface IContent extends IPage{
  content:IUser[]
}
