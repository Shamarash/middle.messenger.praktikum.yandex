export interface IGetChatsProps {
  offset?: number
  limit?: number
  title?: string
}

export interface IChat {
  id: number
  title: string
  avatar: string
  unread_count: string
  last_message: {
    first_name: string
    second_name: string
    avatar: string
    email: string
    login: string
    phone: string
  }
  time: string
  content: string
}

export interface IChatCreateProps {
  title: string
}

export interface IChatDeleteProps {
  chatId: number
}

export interface IChatFile {
  id: number
  user_id: number
  chat_id: number
  time: string
  type: string
  content: number
  file: {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  }
}

export interface IGetChatUsersProps {
  offset?: number
  limit?: number
  name?: string
  email?: string
}

export interface IChatUser {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
  role: string
}

export interface IUnreadCount {
  unread_count: number
}

export interface IAddUserToChat {
  users: number[]
  chatId: number
}

export interface IChatToken {
  token: string
}
