import { Component } from '../../component'
import template from './template'
import { IContactsListProps } from '../../interface/contactsList'
import store, { Connect } from '../../store'
import { IStore } from '../../interface/store'
import { CreateChat } from '../../store/actions'
import ChatsController from '../../controllers/ChatsController'

class ContactsList extends Component<IContactsListProps> {
  render (): Node | void {
    return this.compile(template, {
      ...this._props,
      users: this._props.searchUsers,
      chatList: this._props.chats.map(i => {
        return {
          ...i, selected: store.getState().selectedChat === i.id
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
    const isSearch = state.searchValue !== ''
    return {
      attributes: {
        class: 'contactsList'
      },
      isSearch,
      chats: state.chats,
      searchUsers: state.searchUsers,
      searchValue: state.searchValue,
      eventsWithSelector: {
        ul: {
          click: function (e: MouseEvent) {
            const name = (e.target as HTMLUListElement).closest('li')?.querySelector('h4')?.textContent
            const id = (e.target as HTMLUListElement).closest('li')?.getAttribute('id')
              console.log(id)
            if (isSearch && id && name) {
              store.set('searchValue', '')
              const search = document.getElementById('search') as HTMLInputElement
              search.value = ''
              const existingChat = store.getState().chats.find(i => i.title === name)
              if (existingChat) {
                ChatsController.selectChat(existingChat.id)
                return
              }
              CreateChat({
                chatTitle: name,
                userId: +id,
              })
              return
            }
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
