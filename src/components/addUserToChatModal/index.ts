import { Component } from '../../component'
import template from './template'
import { ClearUsersSearch, SearchUsers } from '../../store/actions'
import store, { Connect } from '../../store'
import { IStore } from '../../interface/store'
import { debounce } from '../../utils/debounce'
import { IBaseProps } from '../../interface/component'
import ChatsController from '../../controllers/ChatsController'
import { baseUrl } from '../../api/base'

// eslint-disable-next-line @typescript-eslint/ban-types
class AddUserToChatModal extends Component<{}> {
  render (): Node | void {
    return this.compile(template, this._props)
  }

  componentDidUpdate (oldProps: IBaseProps, newProps: IBaseProps): boolean {
    setTimeout(() => {
      const input = document.getElementById('addUserInput') as HTMLInputElement
      input.value = store.getState().searchValue
      input.focus()
    }, 0)

    return super.componentDidUpdate(oldProps, newProps)
  }
}

export const closeAddUserModal = () => {
  const input = document.getElementById('addUserInput') as HTMLInputElement
  input.value = ''
  ClearUsersSearch()
  store.set('searchValue', '')
  store.set('addUserModalOpened', false)
}

function handleInput (e: Event) {
  const value = (e.target as HTMLInputElement)?.value ?? ''
  console.log(e)
  store.set('searchValue', value)
  if (value.length <= 3) {
    ClearUsersSearch()
    return
  }
  SearchUsers(value)
}

const AddUserModal = Connect(
  AddUserToChatModal,
  (state: IStore) => {
    return {
      currentUsers: state.chatUsers.map(user => {
        return {
          ...user,
          avatar: user?.avatar ? baseUrl + user?.avatar : null
        }
      }),
      usersToAdd: state.searchUsers,
      search: !!state.searchValue,
      attributes: {
        class: `modalOverlay ${state.addUserModalOpened ? 'modalVisible' : ''}`,
        id: 'addUserToChatModalOverlay',
      },
      events: {
        click: function (e: Event) {
          if (e.target === e.currentTarget) {
            closeAddUserModal()
          }
        }
      },
      eventsWithSelector: {
        '#addUserButton': {
          click: function () {
            const input = document.getElementById('addUserInput') as HTMLInputElement
            if (input) {
              const value = input.value
              if (value) {
                SearchUsers(value)
              }
            }
          }
        },
        '#addUserInput': {
          // @ts-expect-error
          input: debounce(handleInput, 500)
        },
        '#userList': {
          click: function (e: Event) {
            const el = e.target as HTMLButtonElement
            if (el?.classList.contains('deleteUserButton')) {
              const id = el.getAttribute('id')
              const chatId = state.selectedChat
              if (id && chatId) {
                void ChatsController.deleteUserFromChat(chatId, +id)
              }
            }
          }
        },
        '#addUserList': {
          click: function (e: Event) {
            const el = e.target as HTMLButtonElement
            if (el?.classList.contains('addUserButton')) {
              const id = el.getAttribute('id')
              const chatId = state.selectedChat
              if (id && chatId) {
                void ChatsController.addUserToChat(chatId, +id)
              }
            }
          }
        }
      }
    }
  })

export default new AddUserModal('div', {})
