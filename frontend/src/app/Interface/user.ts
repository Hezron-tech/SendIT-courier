export interface Users{
    id?:number
    username:string
    email:string
    password:string
}

export interface Login{
    email: string;
    password: string;
    error:string
    message:string
    token:string
    role:string
    
  }

export interface Parcels{
    
}  