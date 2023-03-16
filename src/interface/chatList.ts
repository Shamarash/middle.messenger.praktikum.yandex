import { IBaseProps } from './component'
import { IUserInfo } from './api/auth'
import {IChats} from "./chat";

export interface IChatListProps extends IBaseProps {
  items: IChats
}
