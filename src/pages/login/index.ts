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

const content: ILoginProps = {
  title: 'Вход',
  inputs: [
    input({
      id: 'login',
      title: 'Введите свой логин',
      placeholder: 'Логин',
      required: true,
      pattern: LoginPattern,
      minLength: 3,
      maxLength: 20,
      value: '',
      errorText: LoginRule
    }),
    input({
      id: 'password',
      title: 'Введите свой пароль',
      placeholder: 'Пароль',
      required: true,
      type: InputTypeEnum.password,
      pattern: PasswordPattern,
      minLength: 8,
      maxLength: 40,
      value: '',
      errorText: PasswordRule
    })
  ],
  submitBtn: button({
    name: 'Войти',
    type: ButtonTypeEnum.primary,
    disabled: false,
    submit: true
  }),
  linkToRegister: link({
    name: 'Нет аккаунта? Зарегистрироваться',
    href: '#register',
    id: 'link-register'
  })
}

class LoginPage extends Component<ILoginProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }

  onFormSubmit (e: SubmitEvent) {
    e.preventDefault()
    const result = {
      login: this._children.inputs[0]._props.attributes.value,
      password: this._children.inputs[1]._props.attributes.value
    }
    console.log('Login form submit', result)
    window.location.hash = '#chats'
  }

  addEvents () {
    this._element.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', this.onFormSubmit.bind(this))
    })
  }

  removeEvents () {
    this._element.querySelectorAll('form').forEach(form => {
      form.removeEventListener('submit', this.onFormSubmit.bind(this))
    })
  }
}

export default () => new LoginPage(
  'div',
  {
    ...content,
    attributes: {
      class: 'centeredFlex'
    }
  }
)
