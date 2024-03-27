import { Alignment, Background, Classes, Dice, Race, Skill, Status } from "./enum";
import { ISpell } from "./ispell";
import { IUser } from "./iuser";

export interface ICharacter {
  id:number,
  user:IUser|null,
  status:Status,
  name:string,
  pgClass:Classes[],
  classArmor:number,
  dice:Dice,
  proficiency:number,
  initiative:number,
  image:string,
  race:Race,
  level:Map<Classes,number>|undefined,
  hp:number,
  background:Background,
  alignment:Alignment,
  backgroundText:string,
  strenght:number,
  dexterity:number,
  constitution:number,
  intelligence:number,
  wisdom:number,
  charisma:number,
  spells:ISpell[],
  skills:Skill[],
  preferredUsers:IUser[]
}

