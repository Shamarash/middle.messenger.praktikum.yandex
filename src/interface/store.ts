import { IChat, IChatFile } from './api/chats'
import { IUserInfo } from './api/auth'

export interface IStore {
  chats: IChat[]
  chatFiles: Record<number, IChatFile>
  chatUsers: Record<number, IUserInfo>
  searchUsers: Record<number, IUserInfo>
  user: IUserInfo | null
  currentChat: IChat | null
}
