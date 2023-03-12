import request, { baseUrl } from './base'
import { IChangePasswordProps, IProfileChangeProps } from '../interface/api/profile'

class UserAPI {
  async getProfile () {
    return await request.get(baseUrl + '/auth/user')
  }

  async changeProfile (data: IProfileChangeProps) {
    return await request.put(baseUrl + '/user/profile', { data })
  }

  async changeAvatar (data: FormData) {
    return await request.put(baseUrl + '/user/profile/avatar', { data })
  }

  async changePassword (data: IChangePasswordProps) {
    return await request.put(baseUrl + '/user/password', { data })
  }

  async userSearch (data: string) {
    return await request.post(baseUrl + '/user/search', { data: { login: data } })
  }
}

const userApi = new UserAPI()
export default userApi
