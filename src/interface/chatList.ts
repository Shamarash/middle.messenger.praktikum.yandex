import { IBaseProps } from './component'
import { IChats } from './chat'

export interface IChatListProps extends IBaseProps {
  items: IChats
}
