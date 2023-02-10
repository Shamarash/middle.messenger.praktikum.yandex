import button from '../../components/button'
import { ButtonTypeEnum } from '../../enum/button'
import input from '../../components/input'
import link from '../../components/link'
import { IRegisterProps } from '../../interface/register'
import { Component } from '../../component'
import { InputTypeEnum } from '../../enum/input'
import { LoginPattern, NamePattern, PasswordPattern, PhonePattern } from '../../utils/Patterns'
import template from './template'
import { LoginRule, NameRule, PasswordRule, PhoneRule, SecondNameRule } from '../../utils/ValidationRules'

const content: IRegisterProps = {
  title: 'Регистрация',
  inputs: [
    input({
      id: 'email',
      title: 'Введите свой E-mail',
      placeholder: 'Почта',
      required: true,
      type: InputTypeEnum.email
    }),
    input({
      id: 'login',
      title: 'Введите свой логин',
      placeholder: 'Логин',
      required: true,
      pattern: LoginPattern,
      errorText: LoginRule,
      minLength: 3,
      maxLength: 20
    }),
    input({
      id: 'first_name',
      title: 'Введите своё имя',
      placeholder: 'Имя',
      required: true,
      pattern: NamePattern,
      errorText: NameRule
    }),
    input({
      id: 'second_name',
      title: 'Введите свою фамилию',
      placeholder: 'Фамилия',
      pattern: NamePattern,
      errorText: SecondNameRule
    }),
    input({
      id: 'phone',
      title: 'Введите номер телефона',
      placeholder: 'Номер телефона',
      pattern: PhonePattern,
      minLength: 10,
      maxLength: 15,
      errorText: PhoneRule
    }),
    input({
      id: 'password',
      title: 'Введите пароль',
      placeholder: 'Пароль',
      required: true,
      type: InputTypeEnum.password,
      pattern: PasswordPattern,
      minLength: 8,
      maxLength: 40,
      errorText: PasswordRule
    }),
    input({
      id: 'password_repeat',
      title: 'Повторите пароль',
      placeholder: 'Пароль (ещё раз)',
      required: true,
      type: InputTypeEnum.password,
      pattern: PasswordPattern,
      minLength: 8,
      maxLength: 40,
      errorText: PasswordRule
    })
  ],
  submitBtn: button({
    name: 'Зарегистрироваться',
    type: ButtonTypeEnum.primary,
    disabled: false,
    submit: true
  }),
  linkToLogin: link({
    name: 'Уже зарегистрированы? Войти',
    href: '#login',
    id: 'link-login'
  })
}

class Register extends Component<IRegisterProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }
}

export default () => new Register(
  'div',
  {
    ...content,
    attributes: {
      class: 'centeredFlex'
    },
    events: {
      submit: function (e: SubmitEvent) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        console.log('Register form submit', formData)
        window.location.hash = '#chats'
      }
    }
  }
)
