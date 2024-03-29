import WSTransport, { WSTransportEvents } from '../api/socket'
import store from '../store'

export interface Message {
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  file?: {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  }
}

class MessagesController {
  private readonly sockets = new Map<number, WSTransport>()

  async connect (id: number, token: string) {
    if (this.sockets.has(id)) {
      return
    }

    const userId = store.getState().user.id

    const wsTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId as string}/${id}/${token}`)

    this.sockets.set(id, wsTransport)

    await wsTransport.connect()

    this.subscribe(wsTransport, id)
    this.fetchOldMessages(id)
  }

  sendMessage (id: number, message: string) {
    const socket = this.sockets.get(id)

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`)
    }

    socket.send({
      type: 'message',
      content: message,
    })
  }

  fetchOldMessages (id: number) {
    const socket = this.sockets.get(id)

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`)
    }
    socket.send({ type: 'get old', content: '0' })
  }

  closeAll () {
    Array.from(this.sockets.values()).forEach(socket => {
      socket.close()
    })
  }

  private onMessage (id: number, messages: Message | Message[]) {
    let messagesToAdd: Message[] = []

    if (Array.isArray(messages)) {
      messagesToAdd = messages.filter(i => i.type === 'message').reverse()
    } else {
      if (messages.type === 'message') {
        messagesToAdd.push(messages)
      }
    }
    // @ts-expect-error
    const currentMessages = store.getState()[`messages.${id}`] || []

    messagesToAdd = [...currentMessages, ...messagesToAdd]

    // @ts-expect-error
    store.set(`messages.${id}`, messagesToAdd)
  }

  private onClose (id: number) {
    this.sockets.delete(id)
  }

  private subscribe (transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.Message, (message: any) => {
      this.onMessage(id, message)
    })
    transport.on(WSTransportEvents.Close, () => {
      this.onClose(id)
    })
  }
}

const controller = new MessagesController()

window.messagesController = controller

export default controller
