import Store from './store'
import { IProfile } from '../interface/profile'
import userApi from '../api/profile'
import { router } from '../router'
import authApi from '../api/auth'
import { ISignInProps, ISignUpProps, IUserInfo } from '../interface/api/auth'
import { ProfileModeEnum } from '../enum/profile'
import { IChangePasswordProps, IProfileChangeProps } from '../interface/api/profile'
import { baseUrl } from '../api/base'
import chatApi from '../api/chats'
import ChatsController from '../controllers/ChatsController'
import messageController from '../controllers/MessageController'
import { setAlert } from '../utils/alert'

const store = new Store()

export const GetMe = () => {
  userApi.getProfile().then(res => {
    console.log(res)
    if (res.code === 401) {
      store.set('user', {})
      router.go('/sign-in')
      return
    }
    if (res.code === 200) {
      const profile = res.data as IProfile
      store.set('user', profile)
    }
  }).catch(error => {
    console.log(error)
  })
}

export const LogIn = (data: ISignInProps) => {
  authApi.logIn(data).then(res => {
    console.log(res)
    if (res.code !== 200) {
      // @ts-expect-error
      throw new Error(res.data?.reason ?? 'Log in error')
    }
    router.go('/messenger')
  }).catch(error => {
    setAlert(error)
    console.log(error)
  })
}

export const SignIn = (data: ISignUpProps) => {
  authApi.register(data).then(res => {
    console.log(res)
    if (res.code !== 200) {
      // @ts-expect-error
      throw new Error(res.data?.reason ?? 'Register error')
    }
    router.go('/messenger')
  }).catch(error => {
    setAlert(error)
    console.log(error)
  })
}

export const ChangeProfile = (data: IProfileChangeProps) => {
  userApi.changeProfile(data).then(res => {
    console.log(res)
    if (res.code !== 200) {
      // @ts-expect-error
      throw new Error(res.data?.reason ?? 'Change profile error')
    }
    GetMe()
    store.set('profileMode', ProfileModeEnum.normal)
  }).catch(error => {
    setAlert(error)
    console.log(error)
  })
}

export const ChangeAvatar = (data: FormData) => {
  userApi.changeAvatar(data).then(res => {
    console.log(res)
    if (res.code !== 200) {
      // @ts-expect-error
      throw new Error(res.data?.reason ?? 'Change avatar error')
    }
    const user = res.data as IProfile
    store.set('user', user)
  }).catch(error => {
    setAlert(error)
    console.log(error)
  })
}

export const ChangePassword = (data: IChangePasswordProps) => {
  userApi.changePassword(data).then(res => {
    console.log(res)
    if (res.code !== 200) {
      // @ts-expect-error
      throw new Error(res.data?.reason ?? 'change Password error')
    }
    store.set('profileMode', ProfileModeEnum.normal)
  }).catch(error => {
    setAlert(error)
    console.log(error)
  })
}

export const LogOut = () => {
  authApi.logOut().then(res => {
    console.log(res)
    if (res.code !== 200) {
      // @ts-expect-error
      throw new Error(res.data?.reason ?? 'Log out error')
    }
    messageController.closeAll()
    store.set('user', {})
    router.go('/sign-in')
  }).catch(error => {
    setAlert(error)
    console.log(error)
  })
}

export const SearchUsers = (data: string) => {
  userApi.userSearch(data).then(res => {
    console.log(res)
    if (res.code !== 200) {
      throw new Error('SearchUsers error')
    }
    const users = res.data as IUserInfo[]
    store.set('searchUsers', users.map(i => ({ ...i, avatar: i.avatar ? baseUrl + '/resources' + i.avatar : null })))
  }).catch(error => {
    console.log(error)
  })
}

export const CreateChat = (chatTitle: string) => {
  chatApi.createChat({ title: chatTitle }).then(res => {
    console.log(res)
    if (res.code !== 200) {
      // @ts-expect-error
      throw new Error(res.data?.reason ?? 'create chat error')
    }
    store.set('addChatModalOpened', false)
    void ChatsController.fetchChats()
  }).catch(error => {
    setAlert(error)
    console.log(error)
  })
}

export const AddUserToChat = (data: { chatId: number, userId: number }) => {
  chatApi.addUserToChat({
    users: [data.userId],
    chatId: data.chatId
  }).then(res => {
    console.log(res)
    if (res.code !== 200) {
      throw new Error('addUserToChat error')
    }
    void ChatsController.fetchChats()
  }).catch(error => {
    console.log(error)
  })
}

export const ChangeProfileState = (data: ProfileModeEnum) => {
  store.set('profileMode', data)
}

export const ClearUsersSearch = () => {
  store.set('searchUsers', [])
}

export const ChangeChatAvatar = (data: FormData) => {
  chatApi.changeAvatar(data).then(res => {
    if (res.code !== 200) {
      // @ts-expect-error
      throw new Error(res.data?.reason ?? 'Change Chat avatar error')
    }
    void ChatsController.fetchChats()
  }).catch(error => {
    setAlert(error)
    console.log(error)
  })
}
