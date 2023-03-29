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

  async addUserToChat (id: number, userId: number) {
    Chats.addUserToChat({ chatId: id, users: [userId] }).then(() => {
      void this.getChatUsers(id)
    }).catch(err => {
      console.log(err)
    })
  }

  async deleteUserFromChat (id: number, userId: number) {
    Chats.deleteUserFromChat({ chatId: id, users: [userId] }).then(() => {
      void this.getChatUsers(id)
    }).catch(err => {
      console.log(err)
    })
  }

  async getChatUsers (id: number) {
    const users = await Chats.getChatUsers(id)
    if (Array.isArray(users.data)) {
      store.set('chatUsers', users.data)
    }
  }

  async delete (id: number) {
    await Chats.deleteChat({ chatId: id })

    store.set('selectedChat', null)
    await this.fetchChats()
  }

  async getToken (id: number) {
    const response = await Chats.getToken(id)
    return response.data?.token ?? ''
  }

  selectChat (id: number) {
    store.set('selectedChat', id)
    store.set('chatUsers', [])
    void this.getChatUsers(id)
  }
}

const controller = new ChatsController()

window.chatsController = controller

export default controller
