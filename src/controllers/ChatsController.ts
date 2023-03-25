import store from '../store'
import MessageController from './MessageController'
import { IChat } from '../interface/chat'
import Chats from '../api/chats'

class ChatsController {
  async create (title: string) {
    await Chats.createChat({ title })

    await this.fetchChats()
  }

  async fetchChats () {
    // @ts-expect-error
    const chats: { data: IChat[] } = await Chats.getChats({})

    chats.data.map(async (chat: IChat) => {
      const token = await this.getToken(chat.id)

      await MessageController.connect(chat.id, token)
    })

    store.set('chats', chats.data)
  }

  addUserToChat (id: number, userId: number) {
    void Chats.addUserToChat({ chatId: id, users: [userId] })
  }

  async delete (id: number) {
    await Chats.deleteChat({ chatId: id })

    await this.fetchChats()
  }

  async getToken (id: number) {
    const response = await Chats.getToken(id)
    return response.data?.token ?? ''
  }

  selectChat (id: number) {
    store.set('selectedChat', id)
  }
}

const controller = new ChatsController()

window.chatsController = controller

export default controller
