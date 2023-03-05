import request, { baseUrl } from './base'
import { IProfileChangeProps } from '../interface/api/profile'

class UserAPI {
  async getProfile () {
    return await request.get(baseUrl + '/user/profile').then(res => res)
  }

  async changeProfile (profile: IProfileChangeProps) {
    return await request.put(baseUrl + '/user/profile', { data: IProfileChangeProps }).then(res => res)
  }
}

// request.get('https://practicum.yandex.ru').then(res => res).catch(err => {
//     console.log(err)
// })

const userApi = new UserAPI()
export default userApi
