import Store from './store'
import { IProfile } from '../interface/profile'
import userApi from '../api/profile'
import { router } from '../router'
import authApi from '../api/auth'
import { ISignInProps, ISignUpProps, IUserInfo } from '../interface/api/auth'
import { ProfileModeEnum } from '../enum/profile'
import { IProfileChangeProps } from '../interface/api/profile'
import { baseUrl } from '../api/base'

const store = new Store()

export const GetMe = () => {
  userApi.getProfile().then(res => {
    console.log(res)
    if (res.code === 401) {
      store.set('user', {})
      router.go('/login')
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
      throw new Error('Log in error')
    }
    router.go('/chats')
  }).catch(error => {
    console.log(error)
  })
}

export const SignIn = (data: ISignUpProps) => {
  authApi.register(data).then(res => {
    console.log(res)
    if (res.code !== 200) {
      throw new Error('Register error')
    }
    router.go('/chats')
  }).catch(error => {
    console.log(error)
  })
}

export const ChangeProfile = (data: IProfileChangeProps) => {
  userApi.changeProfile(data).then(res => {
    console.log(res)
    if (res.code !== 200) {
      throw new Error('Change profile error')
    }
    store.set('user', data)
  }).catch(error => {
    console.log(error)
  })
}

export const ChangeAvatar = (data: FormData) => {
  userApi.changeAvatar(data).then(res => {
    console.log(res)
    if (res.code !== 200) {
      throw new Error('Change avatar error')
    }
    const user = res.data as IProfile
    store.set('user', user)
  }).catch(error => {
    console.log(error)
  })
}

export const LogOut = () => {
  authApi.logOut().then(res => {
    console.log(res)
    if (res.code !== 200) {
      throw new Error('Log out error')
    }
    store.set('user', {})
    router.go('/login')
  }).catch(error => {
    console.log(error)
  })
}

export const SearchUsers = (data: string) => {
  userApi.userSearch(data).then(res => {
    console.log(res)
    if (res.code !== 200) {
      throw new Error('Change profile error')
    }
    const users = res.data as IUserInfo[]
    store.set('searchUsers', users.map(i => ({ ...i, avatar: baseUrl + '/resources' + i.avatar })))
  }).catch(error => {
    console.log(error)
  })
}

export const ChangeProfileState = (data: ProfileModeEnum) => {
  store.set('profileMode', data)
}
