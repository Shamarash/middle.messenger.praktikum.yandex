export interface ISignUpProps {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface ISignUpResponse {
  id: string
}

export interface ISignInProps {
  login: string
  password: string
}

export interface IUserInfo {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}
