import { IChatsProps } from '../../interface/chat'
import { Component } from '../../component'
import template from './template'
import { Connect } from '../../store'
import { IStore } from '../../interface/store'
import link from '../../components/link'
import input from '../../components/input'
import { InputTypeEnum } from '../../enum/input'
import { LoginPattern } from '../../utils/Patterns'
import { debounce } from '../../utils/debounce'
import {ClearUsersSearch, GetMe, SearchUsers} from '../../store/actions'

class Chats extends Component<IChatsProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }
  //
  // componentDidUpdate (oldProps: IChatsProps, newProps: IChatsProps): boolean {
  //   return oldProps.searchUsers !== newProps.searchUsers
  // }

  componentDidMount () {
    ClearUsersSearch()
    GetMe()
  }
}

function handleInput (e: Event) {
  const target = e.target as HTMLInputElement
  SearchUsers(target.value)
}

export const chatsProps: IChatsProps = {
  attributes: {
    class: 'chat'
  },
  profileLink: link({
    name: 'Профиль',
    href: '/profile',
    className: 'linkToProfile'
  }),
  contactsSearch: input({
    id: 'search',
    title: 'Поиск среди всех пользователей',
    placeholder: 'Поиск',
    type: InputTypeEnum.text,
    containerClass: 'searchContainer',
    pattern: LoginPattern,
    minLength: 0,
    maxLength: 10,
    noPlaceholder: true,
  }),
}

export default Connect(
  Chats,
  (state: IStore) => {
    return {
      ...chatsProps,
      chats: state.chats,
      selectedChat: state.currentChat,
      searchUsers: state.searchUsers,
      eventsWithSelector:
          {
            '#search': {
              // @ts-expect-error мы знаем что туда передается
              input: debounce(handleInput, 500)
            }
          }
    }
  }
)
