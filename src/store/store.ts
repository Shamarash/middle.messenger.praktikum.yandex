import { EventBus } from '../eventBus'
import { IStore } from '../interface/store'
import { ProfileModeEnum } from '../enum/profile'

const InitialState: IStore = {
  chats: [],
  user: {},
  selectedChat: null,
  chatFiles: [],
  chatUsers: [],
  searchUsers: [],
  profileMode: ProfileModeEnum.normal,
  messages: {},
  searchValue: '',
  addChatModalOpened: false,
  addUserModalOpened: false
}

export default class Store extends EventBus {
  static EVENT_UPDATE = 'EVENT_UPDATE'
  static _instance: any
  static STORE_NAME = 'store'

  _state: IStore = InitialState

  constructor () {
    if (Store._instance) {
      return Store._instance
    }

    super()

    // const savedState = localStorage.getItem(Store.STORE_NAME)
    //
    // this._state = savedState ? (JSON.parse(savedState) ?? {}) : {}

    Store._instance = this

    // this.on(
    //   Store.EVENT_UPDATE,
    //   () => {
    //     localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state))
    //   }
    // )
  }

  getState () {
    return this._state
  }

  removeState () {
    this._state = InitialState
    this.emit(Store.EVENT_UPDATE)
  }

  set (id: keyof IStore, value: any) {
    // @ts-expect-error
    this._state[id] = value
    this.emit(Store.EVENT_UPDATE)
    return this
  }
}
