import { IUser } from "./iuser"

export interface IPageUser {
  responseDate:Date
  response:IPage
  message:string
}
interface IPage{
  content:IUser[]
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
