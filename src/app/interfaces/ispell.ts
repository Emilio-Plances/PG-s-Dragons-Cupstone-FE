import { Classes } from "./classes"

export interface ISpell {
  id:number
  name:string
  pgClasses:Classes[]
  level:number
  school:School
  castTime:string
  range:string
  duration:string
  components:boolean[]
  materialCost:string
  description:string
}

export enum School{
  Abjuration,
  Conjuration,
  Divination,
  Enchantment,
  Evocation,
  Illusion,
  Transmutation,
  Necromancy
}
