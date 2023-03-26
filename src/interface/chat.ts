import { IBaseProps } from './component'
import { Component } from '../component'
import { ILinkProps } from './link'
import { IInputProps } from './input'
import { IUserInfo } from './api/auth'
import { Message } from '../controllers/MessageController'

export interface IChat {
  id: number
  title: string
  avatar: string | null
  unread_count: number
  last_message: {
    user: {
      first_name: string
      second_name: string
      avatar: string | null
      email: string
      login: string
      phone: string
    }
    time: string
    content: string
  } | null
}

export type IChats = Record<string, IChat>

export interface IChatsProps extends IBaseProps {
  chats?: IChats
  selectedChat?: IChat | null
  profileLink: Component<ILinkProps>
  contactsSearch: Component<IInputProps>
  contacts: any
  searchUsers?: IUserInfo[]
  messages?: Message[]
}
