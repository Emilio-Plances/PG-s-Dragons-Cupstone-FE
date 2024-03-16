import { Classes, School } from "./enum"

export interface ISpell {
  id:number
  name:string
  pgClassList:Classes[]
  level:number
  school:School
  castTime:string
  range:string
  duration:string
  components:boolean[]
  materialCost:string
  description:string
}
