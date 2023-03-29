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
import { ISignUpProps } from '../../interface/api/auth'
import { SignIn } from '../../store/actions'

const content: IRegisterProps = {
  title: 'Регистрация',
  inputs: [
    input({
      attributesWithSelector: {
        input: {
          id: 'email',
          title: 'Введите свой E-mail',
          required: true,
          type: InputTypeEnum.email
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
          pattern: LoginPattern,
        }
      },
      placeholderLabel: 'Логин',
      errorText: LoginRule,
      minLength: 3,
      maxLength: 20
    }),
    input({
      attributesWithSelector: {
        input: {
          id: 'first_name',
          title: 'Введите своё имя',
          required: true,
          pattern: NamePattern,
        }
      },
      placeholderLabel: 'Имя',
      errorText: NameRule
    }),
    input({
      attributesWithSelector: {
        input: {
          id: 'second_name',
          title: 'Введите свою фамилию',
          pattern: NamePattern,
        }
      },
      placeholderLabel: 'Фамилия',
      errorText: SecondNameRule
    }),
    input({
      attributesWithSelector: {
        input: {
          id: 'phone',
          title: 'Введите номер телефона',
          pattern: PhonePattern,
        }
      },
      placeholderLabel: 'Номер телефона',
      minLength: 10,
      maxLength: 15,
      errorText: PhoneRule
    }),
    input({
      attributesWithSelector: {
        input: {
          id: 'password',
          title: 'Введите пароль',
          required: true,
          type: InputTypeEnum.password,
          pattern: PasswordPattern,
        }
      },
      placeholderLabel: 'Пароль',
      minLength: 8,
      maxLength: 40,
      errorText: PasswordRule
    }),
    input({
      attributesWithSelector: {
        input: {
          id: 'password_repeat',
          title: 'Повторите пароль',
          required: true,
          type: InputTypeEnum.password,
          pattern: PasswordPattern,
        }
      },
      placeholderLabel: 'Пароль (ещё раз)',
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
    name: 'Зарегистрироваться',
    submit: true
  }),
  linkToLogin: link({
    href: '/sign-in',
    id: 'link-login',
    name: 'Уже зарегистрированы? Войти',
    className: 'button',
  })
}

export default class Register extends Component<IRegisterProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }
}

export const registerProps: IRegisterProps = {
  ...content,
  attributes: {
    class: 'centeredFlex formContainer'
  },
  events: {
    submit: function (e: SubmitEvent) {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement)
      let result: ISignUpProps = {
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        password: '',
        phone: '',
      }
      formData.forEach((value, key) => {
        if (typeof value === 'string' && Object.keys(result).includes(key)) {
          result = { ...result, [key]: value }
        }
      })
      SignIn(result)
    }
  }
}
