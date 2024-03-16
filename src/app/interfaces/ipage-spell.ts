import { IPage } from "./ipage"
import { ISpell } from "./ispell"

export interface IPageSpell {
  responseDate:Date
  response:IContent
  message:string
}
interface IContent extends IPage{
  content:ISpell[]
}
