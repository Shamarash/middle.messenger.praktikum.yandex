import { IChatsProps } from '../../interface/chat'
import { Component } from '../../component'
import template from './template'
import store, { Connect } from '../../store'
import { IStore } from '../../interface/store'
import link from '../../components/link'
import { GetMe } from '../../store/actions'
import Contacts from '../../components/contactList'
import AddUserModal from '../../components/addUserToChatModal'
import ChatsController from '../../controllers/ChatsController'
import MessageController, { Message } from '../../controllers/MessageController'
import { baseUrl } from '../../api/base'
import AddChatModal from '../../components/addChatModal'

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
  addChatModal: AddChatModal,
  addUserModal: AddUserModal,
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
    const selectedChat = state.chats.find(i => i.id === state.selectedChat)
    return {
      ...chatsProps,
      selectedChatId: selectedChat?.id,
      selectedChat: {
        ...selectedChat,
        avatar: selectedChat?.avatar ? baseUrl + selectedChat?.avatar : null
      },
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
        },
        '#addChatButton': {
          click: function () {
            store.set('addChatModalOpened', true)
          }
        },
        '#addUserToChat': {
          click: function () {
            store.set('addUserModalOpened', true)
          }
        }
      }
    }
  }
)
