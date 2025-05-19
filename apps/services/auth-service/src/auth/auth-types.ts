export interface UserPayload {
    first_name: string
    last_name: string
    email: string
    role_id: number
    password: string
    status: string
  }
  
  export interface AuthPayload {
    email: string
    password: string
  }