import { Component } from '../../component'
import template from './template'
import { CreateChat } from '../../store/actions'
import store, { Connect } from '../../store'
import { IStore } from '../../interface/store'

// eslint-disable-next-line @typescript-eslint/ban-types
class AddChatModal extends Component<{}> {
  render (): Node | void {
    return this.compile(template, this._props)
  }
}

const ChatModal = Connect(
  AddChatModal,
  (state: IStore) => {
    return {
      attributes: {
        class: `modalOverlay ${state.addChatModalOpened ? 'modalVisible' : ''}`,
        id: 'addChatModalOverlay',
      },
      events: {
        click: function (e: Event) {
          if (e.target === e.currentTarget) {
            store.set('addChatModalOpened', false)
            const input = document.getElementById('modalInput') as HTMLInputElement
            input.value = ''
          }
        }
      },
      eventsWithSelector: {
        '#createChatButton': {
          click: function () {
            const input = document.getElementById('modalInput') as HTMLInputElement
            if (input) {
              const value = input.value
              if (value) {
                CreateChat(value)
              }
            }
          }
        }
      }
    }
  })

export default new ChatModal('div', {})
