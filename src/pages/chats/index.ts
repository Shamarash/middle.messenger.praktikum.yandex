import Handlebars from 'handlebars'
import { IChatsProps } from '../../interface/chat'
import { testChats } from '../../testData/chats'
import { Component } from '../../component'
import template from './template'

Handlebars.registerHelper('isMineMessage', (id: string) => {
  return id === '0'
})

Handlebars.registerHelper('isChatSelected', (id: string) => {
  return id === window.selectedChatId?.toString()
})

class Chats extends Component<IChatsProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }
}

export default () => {
  const id: string | null = window.selectedChatId
  const chats = testChats

  const content: IChatsProps = {
    chats,
    selectedChat: (id && chats[id])
      ? chats[id]
      : null
  }

  return new Chats(
    'div',
    {
      ...content,
      attributes: {
        class: 'chat'
      }
    }
  )
}
