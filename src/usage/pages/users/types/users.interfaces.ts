export type IUsers = IUser[]

export interface IUser {
    id: string,
    name: string,
    password: string,
    role: string,
    email: string
}