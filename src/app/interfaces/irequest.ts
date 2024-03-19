export interface IRegister {
  name:string,
  surname:string
  email:string,
  username:string,
  birthday:Date,
  password:string,
}
export interface IPassword {
  oldPassword:string;
  newPassword:string;
}
export interface ILogin {
  email:string|null
  username:string|null
  password:string
}
export interface ICharacterRequest{
  userId:number
}
