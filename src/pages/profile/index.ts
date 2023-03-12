import { Connect } from '../../store'
import Profile from './profile'
import { IStore } from '../../interface/store'
import input from '../../components/input'
import { InputTypeEnum } from '../../enum/input'
import { LoginRule, NameRule, PasswordRule, PhoneRule, SecondNameRule } from '../../utils/ValidationRules'
import { LoginPattern, NamePattern, PasswordPattern, PhonePattern } from '../../utils/Patterns'
import { IProfile, IProfileProps } from '../../interface/profile'
import { ProfileModeEnum } from '../../enum/profile'
import { baseUrl } from '../../api/base'
import link from '../../components/link'

const profileInfoInputs = (isEdit: boolean, profile: IProfile) => [
  input({
    id: 'email',
    title: 'Введите свой E-mail',
    placeholder: 'Почта',
    required: true,
    type: InputTypeEnum.email,
    disabled: !isEdit,
    value: profile.email,
  }),
  input({
    id: 'login',
    title: 'Введите свой логин',
    placeholder: 'Логин',
    required: true,
    disabled: !isEdit,
    value: profile.login,
    errorText: LoginRule,
    pattern: LoginPattern
  }),
  input({
    id: 'first_name',
    title: 'Введите своё имя',
    placeholder: 'Имя',
    required: true,
    disabled: !isEdit,
    value: profile.first_name,
    errorText: NameRule,
    pattern: NamePattern
  }),
  input({
    id: 'second_name',
    title: 'Введите свою фамилию',
    placeholder: 'Фамилия',
    disabled: !isEdit,
    value: profile.second_name,
    errorText: SecondNameRule,
    pattern: NamePattern
  }),
  input({
    id: 'display_name',
    title: 'Введите имя для чата',
    placeholder: 'Имя в чате',
    disabled: !isEdit,
    value: profile.display_name || '',
  }),
  input({
    id: 'phone',
    title: 'Введите номер телефона',
    placeholder: 'Номер телефона',
    disabled: !isEdit,
    value: profile.phone,
    errorText: PhoneRule,
    pattern: PhonePattern
  })
]

const changePasswordInputs = [
  input({
    id: 'oldPassword',
    title: 'Введите cтарый пароль',
    placeholder: 'Старый пароль',
    required: true,
    type: InputTypeEnum.password,
    errorText: PasswordRule,
    pattern: PasswordPattern
  }),
  input({
    id: 'newPassword',
    title: 'Введите новый пароль',
    placeholder: 'Новый пароль',
    required: true,
    type: InputTypeEnum.password,
    errorText: PasswordRule,
    pattern: PasswordPattern
  }),
  input({
    id: 'newPasswordRepeat',
    title: 'Повторите новый пароль',
    placeholder: 'Повторите новый пароль',
    required: true,
    type: InputTypeEnum.password,
    errorText: PasswordRule,
    pattern: PasswordPattern
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
      profile: state.user,
      isEdit: state.profileMode !== ProfileModeEnum.normal,
      chatsLink: link({
        name: '',
        href: '/chats',
        className: 'goBackLink'
      }),
      showProfileTitle: state.profileMode === ProfileModeEnum.normal,
      avatarUrl: typeof state.user.avatar === 'string' ? baseUrl + '/resources' + state.user.avatar : '',
    }
  }
)
