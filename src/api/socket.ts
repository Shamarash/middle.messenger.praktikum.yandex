interface ISocketProps {
  userId: string
  chatId: string
  token: string
}
interface ISocketMessage {
  userId: string
  chatId: string
  token: string
}
interface ISocketErrorEvent extends Event {
  message: string
}

export class Socket {
  private readonly socket: WebSocket
  constructor ({ userId, chatId, token }: ISocketProps) {
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`)
    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено')
    })
    this.socket.addEventListener('close', event => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто')
      } else {
        console.log('Обрыв соединения')
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`)
    })

    this.socket.addEventListener('message', event => {
      console.log('Получены данные', event.data)
    })

    this.socket.addEventListener('error', event => {
      console.log('Ошибка', (event as ISocketErrorEvent).message)
    })
  }

  sendMessage (value: string) {
    this.socket.send(JSON.stringify({
      content: value,
      type: 'message',
    }))
  }

  getOldMessages (lastMessageId: string) {
    this.socket.send(JSON.stringify({
      content: lastMessageId, // Число, которое показывает с какого сообщения нужно отдать ещё 20
      type: 'get old',
    }))
  }
}
