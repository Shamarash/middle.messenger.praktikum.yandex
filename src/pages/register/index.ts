import button from "../../components/button";
import {ButtonTypeEnum} from "../../enum/button";
import input from "../../components/input";
import link from "../../components/link";
import {IRegisterProps} from "../../interface/register";
import {Component} from "../../component";

const register = `<div class="centeredFlexContent">
        <h2>
            {{title}}
        </h2>
        <form onsubmit="(function() {
                window.location.hash = '#login'
                })()">
            <div class="formInputs">
                {{#each inputs}}
                    {{{this}}}
                {{/each}}
            </div>
            <div class="formButtons">
                {{{submitBtn}}}
                {{{linkToLogin}}}
            </div>
        </form>
    </div>`

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
        href: '#login',
        id: 'link-login'
    }),
}

class Register extends Component<IRegisterProps> {

    render(): Node | void {
        return this.compile(register, this._props);
    }

    addEvents() {
        super.addEvents();
        // this._element.addEventListener('click', (e) => {
        //     console.log('click', e)
        // })
    }
}

export default () => new Register(
    'div',
    {
        ...content,
        attributes: {
            class: `centeredFlex`,
        },
    }
)
