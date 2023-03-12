import { IChat, IChatFile } from './api/chats'
import { IUserInfo } from './api/auth'
import { ProfileModeEnum } from '../enum/profile'

export interface IStore {
  chats: IChat[]
  chatFiles: IChatFile[]
  chatUsers: IUserInfo[]
  searchUsers: IUserInfo[]
  user: IUserInfo | Record<string, unknown>
  currentChat: IChat | null
  profileMode: ProfileModeEnum
}
