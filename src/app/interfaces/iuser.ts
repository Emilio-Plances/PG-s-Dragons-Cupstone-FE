export interface IUser {
  id: number,
  username: string,
  email: string,
  name: string,
  surname: string,
  birthday: Date|null,
  info: string|null,
  linkPhoto: string|null,
  role: Role|null
}
enum Role{
  User,
  Admin
}
