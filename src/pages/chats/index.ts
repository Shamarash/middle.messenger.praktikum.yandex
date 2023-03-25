import { IChatsProps } from '../../interface/chat'
import { Component } from '../../component'
import template from './template'
import store, { Connect } from '../../store'
import { IStore } from '../../interface/store'
import link from '../../components/link'
import { GetMe } from '../../store/actions'
import Contacts from '../../components/contactList'
import ContactsSearch from '../../components/contactsSearch'
import ChatsController from '../../controllers/ChatsController'
import MessageController from '../../controllers/MessageController'

class Chats extends Component<IChatsProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }

  componentDidMount () {
    GetMe()
  }

  componentDidUpdate (oldProps: IChatsProps, newProps: IChatsProps): boolean {
    return oldProps.selectedChat !== newProps.selectedChat
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
    return {
      ...chatsProps,
      selectedChat: state.selectedChat,
      messages: state.messages[state.selectedChat?.id ?? 0],
      eventsWithSelector: {
        '#messageSendForm': {
          submit: function (e: SubmitEvent) {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            if (form && state.selectedChat) {
              const formData = new FormData(form)
              MessageController.sendMessage(
                state.selectedChat.id,
                (formData.get('message') as string) || 'test message'
              )
            }
          }

        }
      }
    }
  }
)
