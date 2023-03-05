import { Connect } from '../../store'
import Chats from './chats'
import { IStore } from '../../interface/store'

export default Connect(
  Chats,
  (state: IStore) => {
    return {
      chats: state.chats,
      selectedChat: state.currentChat

    }
  }
)
