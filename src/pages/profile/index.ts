import { Connect } from '../../store'
import { IStore } from '../../interface/store'
import input from '../../components/input'
import { InputTypeEnum } from '../../enum/input'
import { LoginRule, NameRule, PasswordRule, PhoneRule, SecondNameRule } from '../../utils/ValidationRules'
import { LoginPattern, NamePattern, PasswordPattern, PhonePattern } from '../../utils/Patterns'
import { IProfile, IProfileProps } from '../../interface/profile'
import { ProfileModeEnum } from '../../enum/profile'
import { baseUrl } from '../../api/base'
import link from '../../components/link'
import Component from '../../component'
import template from './template'
import { ChangeAvatar, ChangePassword, ChangeProfile, ChangeProfileState, GetMe, LogOut } from '../../store/actions'
import { IChangePasswordProps, IProfileChangeProps } from '../../interface/api/profile'

class Profile extends Component<IProfileProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }

  componentDidMount () {
    GetMe()
  }
}

const profileInfoInputs = (isEdit: boolean, profile: IProfile) => [
  input({
    attributesWithSelector: {
      input: {
        id: 'email',
        title: 'Введите свой E-mail',
        required: true,
        type: InputTypeEnum.email,
        disabled: !isEdit,
        value: profile.email,
      }
    },
    placeholderLabel: 'Почта',

  }),
  input({
    attributesWithSelector: {
      input: {
        id: 'login',
        title: 'Введите свой логин',
        required: true,
        disabled: !isEdit,
        value: profile.login,
        pattern: LoginPattern
      }
    },
    placeholderLabel: 'Логин',
    errorText: LoginRule,
  }),
  input({
    attributesWithSelector: {
      input: {
        id: 'first_name',
        title: 'Введите своё имя',
        required: true,
        disabled: !isEdit,
        value: profile.first_name,
        pattern: NamePattern
      }
    },
    placeholderLabel: 'Имя',
    errorText: NameRule,
  }),
  input({
    attributesWithSelector: {
      input: {
        id: 'second_name',
        title: 'Введите свою фамилию',
        disabled: !isEdit,
        value: profile.second_name,
        pattern: NamePattern
      }
    },
    placeholderLabel: 'Фамилия',
    errorText: SecondNameRule,
  }),
  input({
    attributesWithSelector: {
      input: {
        id: 'display_name',
        title: 'Введите имя для чата',
        disabled: !isEdit,
        value: profile.display_name || '',
      }
    },
    placeholderLabel: 'Имя в чате',
  }),
  input({
    attributesWithSelector: {
      input: {
        id: 'phone',
        title: 'Введите номер телефона',
        disabled: !isEdit,
        value: profile.phone,
        errorText: PhoneRule,
        pattern: PhonePattern
      }
    },
    placeholderLabel: 'Номер телефона',
  })
]

const changePasswordInputs = [
  input({
    attributesWithSelector: {
      input: {
        id: 'oldPassword',
        title: 'Введите cтарый пароль',
        required: true,
        type: InputTypeEnum.password,
        pattern: PasswordPattern
      }
    },
    placeholderLabel: 'Старый пароль',
    errorText: PasswordRule,
  }),
  input({
    attributesWithSelector: {
      input: {
        id: 'newPassword',
        title: 'Введите новый пароль',
        required: true,
        type: InputTypeEnum.password,
        pattern: PasswordPattern
      }
    },
    placeholderLabel: 'Новый пароль',
    errorText: PasswordRule,
  }),
  input({
    attributesWithSelector: {
      input: {
        id: 'newPasswordRepeat',
        title: 'Повторите новый пароль',
        required: true,
        type: InputTypeEnum.password,
        pattern: PasswordPattern
      }
    },
    errorText: PasswordRule,
    placeholderLabel: 'Повторите новый пароль',
  })
]

const getCurrentContent = (state: string | null, profile: IProfile): IProfileProps => {
  switch (state) {
    case ProfileModeEnum.changeInfo : {
      return {
        isEdit: true,
        inputs: profileInfoInputs(true, profile)
      }
    }
    case ProfileModeEnum.changePassword : {
      return {
        isEdit: true,
        inputs: changePasswordInputs
      }
    }
    case ProfileModeEnum.normal :
    default : {
      return {
        isEdit: false,
        inputs: profileInfoInputs(false, profile)
      }
    }
  }
}

export default Connect(
  Profile,
  (state: IStore) => {
    return {
      ...getCurrentContent(state.profileMode, state.user as IProfile),
      attributes: {
        class: 'centeredFlex formContainer'
      },
      eventsWithSelector: {
        '.profileSubmitButton': {
          click: function (e: MouseEvent) {
            const el = e.target as HTMLDivElement
            e.preventDefault()
            const form = el.closest('form') as HTMLFormElement
            if (form) {
              const formData = new FormData(form)

              switch (state.profileMode) {
                case ProfileModeEnum.changeInfo: {
                  let result: IProfileChangeProps = {
                    email: '',
                    login: '',
                    first_name: '',
                    second_name: '',
                    display_name: '',
                    phone: '',
                  }
                  formData.forEach((value, key) => {
                    if (typeof value === 'string' && Object.keys(result).includes(key)) {
                      result = { ...result, [key]: value }
                    }
                  })
                  ChangeProfile(result)
                  const avatarForm = el.closest('.profileContent')?.querySelector('.profileAvatarForm') as HTMLFormElement
                  const hasAvatar = avatarForm.querySelector('input') as HTMLInputElement
                  if (avatarForm && (hasAvatar?.files?.length ?? 0) > 0) {
                    const avatarFormData = new FormData(avatarForm)
                    ChangeAvatar(avatarFormData)
                  }
                  return
                }
                case ProfileModeEnum.changePassword: {
                  let result: IChangePasswordProps = {
                    newPassword: '',
                    oldPassword: '',
                  }
                  formData.forEach((value, key) => {
                    if (typeof value === 'string' && Object.keys(result).includes(key)) {
                      result = { ...result, [key]: value }
                    }
                  })
                  ChangePassword(result)
                }
              }
            }
          }
        },
        '.changePassword': {
          click: function () {
            ChangeProfileState(ProfileModeEnum.changePassword)
          }
        },
        '.changeProfile': {
          click: function () {
            ChangeProfileState(ProfileModeEnum.changeInfo)
          }
        },
        '.cancelEdit': {
          click: function () {
            ChangeProfileState(ProfileModeEnum.normal)
          }
        },
        '.exitLink': {
          click: function () {
            LogOut()
          }
        },
        '.profileForm': {
          change: function (e: Event) {
            console.log('this', this)
            console.log('e', e)
          },
        },
      },
      profile: state.user,
      isEdit: state.profileMode !== ProfileModeEnum.normal,
      chatsLink: link({
        name: '',
        href: '/messenger',
        className: 'goBackLink'
      }),
      showProfileTitle: state.profileMode === ProfileModeEnum.normal,
      avatarUrl: typeof state.user.avatar === 'string' ? baseUrl + '/resources' + state.user.avatar : '',
    }
  }
)
