import { Component } from '../../component'
import template from './template'
import { IContactsListProps } from '../../interface/contactsList'
import store, { Connect } from '../../store'
import { IStore } from '../../interface/store'
import ChatsController from '../../controllers/ChatsController'
import { baseUrl } from '../../api/base'
import { IChat } from '../../interface/chat'

class ContactsList extends Component<IContactsListProps> {
  render (): Node | void {
    return this.compile(template, {
      ...this._props,
      users: this._props.searchUsers,
      chatList: this._props.chats?.map((i: IChat) => {
        return {
          ...i,
          selected: store.getState().selectedChat === i.id,
          avatar: i?.avatar ? baseUrl + '/resources' + i.avatar : null,
        }
      }),
    })
  }

  componentDidMount () {
    super.componentDidMount()
    void ChatsController.fetchChats()
  }
}

const Contacts = Connect(
  ContactsList,
  (state: IStore) => {
    return {
      attributes: {
        class: 'contactsList'
      },
      chats: state.chats,
      searchUsers: state.searchUsers,
      searchValue: state.searchValue,
      eventsWithSelector: {
        ul: {
          click: function (e: MouseEvent) {
            const id = (e.target as HTMLUListElement).closest('li')?.getAttribute('id')
            if (id) {
              ChatsController.selectChat(+id)
            }
          }
        }

      }
    }
  }
)

export default new Contacts('div', {})
