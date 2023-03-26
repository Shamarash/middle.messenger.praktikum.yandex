import { IChatsProps } from '../../interface/chat'
import { Component } from '../../component'
import template from './template'
import { Connect } from '../../store'
import { IStore } from '../../interface/store'
import link from '../../components/link'
import { GetMe } from '../../store/actions'
import Contacts from '../../components/contactList'
import ContactsSearch from '../../components/contactsSearch'
import ChatsController from '../../controllers/ChatsController'
import MessageController, { Message } from '../../controllers/MessageController'
import { baseUrl } from '../../api/base'

class Chats extends Component<IChatsProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }

  componentDidMount () {
    GetMe()
    void ChatsController.fetchChats()
  }

  componentDidUpdate (oldProps: IChatsProps, newProps: IChatsProps): boolean {
    return oldProps.selectedChat !== newProps.selectedChat || oldProps.messages !== newProps.messages
  }
}

export const chatsProps: IChatsProps = {
  attributes: {
    class: 'chat'
  },
  contactsSearch: ContactsSearch,
  contacts: Contacts,
  profileLink: link({
    name: 'Профиль',
    href: '/profile',
    className: 'linkToProfile'
  }),

}

export default Connect(
  Chats,
  (state: IStore) => {
    // @ts-expect-error
    const messages: Message[] = state[`messages.${state.selectedChat ?? 0}`] || []
    return {
      ...chatsProps,
      selectedChat: state.selectedChat,
      messages: messages.map(msg => {
        const time = new Date(msg.time)
        return {
          ...msg,
          isMineMessage: msg.user_id === state.user.id,
          time: time.toLocaleTimeString(),
          file: msg.file
            ? {
                ...msg.file,
                path: baseUrl + msg.file.path
              }
            : undefined
        }
      }),
      eventsWithSelector: {
        '#messageSendForm': {
          submit: function (e: SubmitEvent) {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            if (form && state.selectedChat) {
              const formData = new FormData(form)
              MessageController.sendMessage(
                state.selectedChat,
                (formData.get('message') as string) || 'test message'
              );

              (form.querySelector('input') as HTMLInputElement).value = ''
            }
          }

        },
        '#deleteChat': {
          click: function (e: MouseEvent) {
            e.preventDefault()
            if (state.selectedChat) {
              void ChatsController.delete(state.selectedChat)
            }
          }
        }
      }
    }
  }
)
