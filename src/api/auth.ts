import request, { baseUrl } from './base'
import { ISignInProps, ISignUpProps } from '../interface/api/auth'

class AuthAPI {
  async logIn (data: ISignInProps) {
    return await request.post(baseUrl + '/auth/signin', { data })
  }

  async register (data: ISignUpProps) {
    return await request.post(baseUrl + '/auth/signup', { data })
  }

  async logOut () {
    return await request.post(baseUrl + '/auth/logout')
  }
}

const authApi = new AuthAPI()
export default authApi
