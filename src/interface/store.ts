import { IChat, IChatFile } from './api/chats'
import { IUserInfo } from './api/auth'
import { ProfileModeEnum } from '../enum/profile'
import { Message } from '../controllers/MessageController'

export interface IStore {
  chats: IChat[]
  chatFiles: IChatFile[]
  chatUsers: IUserInfo[]
  searchUsers: IUserInfo[]
  searchValue: string
  user: IUserInfo | Record<string, unknown>
  selectedChat: IChat | null
  profileMode: ProfileModeEnum
  messages: Record<number, Message[]>
}
