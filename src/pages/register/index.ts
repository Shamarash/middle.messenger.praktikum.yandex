import button from "../../components/button";
import {ButtonTypeEnum} from "../../enum/button";
import input from "../../components/input";
import link from "../../components/link";
import {IRegisterProps} from "../../interface/register";
import {Component} from "../../component";


const content: IRegisterProps = {
    title: 'Регистрация',
    inputs: [
        input({
            id: 'email',
            title: 'Введите свой E-mail',
            placeholder: 'Почта',
            required: true
        }),
        input({
            id: 'login',
            title: 'Введите свой логин',
            placeholder: 'Логин',
            required: true
        }),
        input({
            id: 'first_name',
            title: 'Введите своё имя',
            placeholder: 'Имя',
            required: true
        }),
        input({
            id: 'second_name',
            title: 'Введите свою фамилию',
            placeholder: 'Фамилия'
        }),
        input({
            id: 'phone',
            title: 'Введите номер телефона',
            placeholder: 'Номер телефона'
        }),
        input({
            id: 'password',
            title: 'Введите пароль',
            placeholder: 'Пароль',
            required: true
        }),
        input({
            id: 'password_repeat',
            title: 'Повторите пароль',
            placeholder: 'Пароль (ещё раз)',
            required: true
        }),
    ],
    submitBtn: button({
        name: 'Зарегистрироваться',
        type: ButtonTypeEnum.primary,
        disabled: false,
        submit: true
    }),
    linkToLogin: link({
        name: 'Уже зарегистрированы? Войти',
        href: '#login'
    }),
}

class Register extends Component<IRegisterProps> {

    render(): Node | void {
        return this.compile(`{{name}}`, this._props);
    }

    addEvents() {
        super.addEvents();
        this._element.addEventListener('click', (e) => {
            console.log('click', e)
        })
    }
}

export default () => new Register(
    'div',
    {
        ...content,
        attributes: {
            // class: `button ${props.type}`,
            // type: props.submit ? 'submit' : 'button',
            // disabled: props.disabled
        },
    }
)
