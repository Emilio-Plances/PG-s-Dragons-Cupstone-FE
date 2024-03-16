import { ISpell } from "./ispell"

export interface IPageSpell {
  responseDate:Date
  response:IPage
  message:string
}
interface IPage{
  content:ISpell[]
  pageable:Pageable
  last:boolean
  totalElements:number
  totalPages:number
  size:number
  number:number
  sort:Sort
  first:boolean
  numberOfElements:number
}
interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}
interface Pageable{
  pageNumber: number
  pageSize: number
  sort: Sort
  offset: number
  unpaged: boolean
  paged: boolean
}
