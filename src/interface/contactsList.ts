import { IBaseProps } from './component'
import { IUserInfo } from './api/auth'

export interface IContactsListProps extends IBaseProps {
  items: IUserInfo
}
