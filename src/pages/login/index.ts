import button from '../../components/button'
import { ButtonTypeEnum } from '../../enum/button'
import input from '../../components/input'
import link from '../../components/link'
import { Component } from '../../component'
import { ILoginProps } from '../../interface/login'
import { InputTypeEnum } from '../../enum/input'
import { LoginPattern, PasswordPattern } from '../../utils/Patterns'
import template from './template'
import { LoginRule, PasswordRule } from '../../utils/ValidationRules'
import { ISignInProps } from '../../interface/api/auth'
import { GetMe, LogIn } from '../../store/actions'

const content: ILoginProps = {
  attributes: {},
  title: 'Вход',
  inputs: [
    input({
      attributesWithSelector: {
        input: {
          id: 'login',
          title: 'Введите свой логин',
          required: true,
          pattern: LoginPattern,
        }
      },
      placeholderLabel: 'Логин',
      showError: false,
      minLength: 3,
      maxLength: 20,
      errorText: LoginRule
    }),
    input({
      attributesWithSelector: {
        input: {
          id: 'password',
          title: 'Введите свой пароль',
          required: true,
          type: InputTypeEnum.password,
          pattern: PasswordPattern,
        }
      },
      placeholderLabel: 'Пароль',
      showError: false,
      minLength: 8,
      maxLength: 40,
      errorText: PasswordRule
    })
  ],
  submitBtn: button({
    attributes: {
      type: ButtonTypeEnum.primary,
      disabled: false,
    },
    name: 'Войти',
    submit: true
  }),
  linkToRegister: link({
    attributes: {
      href: '/register',
      id: 'link-register'
    },
    name: 'Нет аккаунта? Зарегистрироваться',
    className: 'button',
  })
}

export default class LoginPage extends Component<ILoginProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }

  componentDidMount () {
    GetMe()
  }

}

export const loginProps: ILoginProps = {
  ...content,
  attributes: {
    class: 'centeredFlex formContainer'
  },
  eventsWithSelector: {
    form: {
      submit: function (e: SubmitEvent) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        let result: ISignInProps = {
          login: '',
          password: '',
        }
        formData.forEach((value, key) => {
          if (typeof value === 'string') {
            if (key === 'login') {
              result = { ...result, login: value }
              return
            }
            if (key === 'password') {
              result = { ...result, password: value }
            }
          }
        })
        LogIn(result)
      }
    }
  },
  events: {

  }
}
