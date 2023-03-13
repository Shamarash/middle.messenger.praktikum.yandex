import request, { baseUrl } from './base'
import { IAddUserToChat, IChatCreateProps, IChatDeleteProps, IGetChatsProps } from '../interface/api/chats'

class ChatAPI {
  async getChats (data: IGetChatsProps) {
    return await request.get(baseUrl + '/chats', { data })
  }

  async createChat (data: IChatCreateProps) {
    return await request.post(baseUrl + '/chats', { data })
  }

  async deleteChat (data: IChatDeleteProps) {
    return await request.post(baseUrl + '/chats', { data })
  }

  async addUserToChat (data: IAddUserToChat) {
    return await request.put(baseUrl + '/chats/users', { data })
  }
}

const chatApi = new ChatAPI()
export default chatApi