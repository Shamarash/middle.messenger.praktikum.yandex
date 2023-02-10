import Handlebars from 'handlebars'
import input from '../../components/input'
import { InputTypeEnum } from '../../enum/input'
import { testProfile } from '../../testData/profile'
import { ProfileStateEnum } from '../../enum/profile'
import { Component } from '../../component'
import { IProfileProps } from '../../interface/profile'
import template from './template'
import { LoginRule, NameRule, PasswordRule, PhoneRule, SecondNameRule } from '../../utils/ValidationRules'
import { LoginPattern, NamePattern, PasswordPattern, PhonePattern } from '../../utils/Patterns'

Handlebars.registerHelper('showProfileTitle', () => {
  return window.profileState === ProfileStateEnum.normal ||
        window.profileState === undefined
})

const profileInfoInputs = (isEdit: boolean) => [
  input({
    id: 'email',
    title: 'Введите свой E-mail',
    placeholder: 'Почта',
    required: true,
    type: InputTypeEnum.email,
    disabled: !isEdit,
    value: testProfile.email
  }),
  input({
    id: 'login',
    title: 'Введите свой логин',
    placeholder: 'Логин',
    required: true,
    disabled: !isEdit,
    value: testProfile.login,
    errorText: LoginRule,
    pattern: LoginPattern
  }),
  input({
    id: 'first_name',
    title: 'Введите своё имя',
    placeholder: 'Имя',
    required: true,
    disabled: !isEdit,
    value: testProfile.first_name,
    errorText: NameRule,
    pattern: NamePattern
  }),
  input({
    id: 'second_name',
    title: 'Введите свою фамилию',
    placeholder: 'Фамилия',
    disabled: !isEdit,
    value: testProfile.second_name,
    errorText: SecondNameRule,
    pattern: NamePattern
  }),
  input({
    id: 'display_name',
    title: 'Введите имя для чата',
    placeholder: 'Имя в чате',
    disabled: !isEdit,
    value: testProfile.display_name
  }),
  input({
    id: 'phone',
    title: 'Введите номер телефона',
    placeholder: 'Номер телефона',
    disabled: !isEdit,
    value: testProfile.phone,
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

const getCurrentContent = (state: string | null): IProfileProps => {
  switch (state) {
    case ProfileStateEnum.changeInfo : {
      return {
        isEdit: true,
        inputs: profileInfoInputs(true)
      }
    }
    case ProfileStateEnum.changePassword : {
      return {
        isEdit: true,
        inputs: changePasswordInputs
      }
    }
    case ProfileStateEnum.normal :
    default : {
      return {
        isEdit: false,
        inputs: profileInfoInputs(false)
      }
    }
  }
}

class Profile extends Component<IProfileProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }
}

export default () => {
  const state: string | null = window.profileState

  return new Profile(
    'div',
    {
      ...getCurrentContent(state),
      profile: testProfile,
      attributes: {
        class: 'centeredFlex'
      }
    }
  )
}
