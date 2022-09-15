export interface User{
    id:string
    username:string
    email:string
    password:string
    role:string
    welcome:string
    
}

export interface Data{
    id: string,
    username:string,
    role:string,
    email: string,
    iat: number,
    exp: number
  }