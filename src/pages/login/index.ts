
import button from "../../components/button";
import {ButtonTypeEnum} from "../../enum/button";
import input from "../../components/input";
import link from "../../components/link";
import {Component} from "../../component";
import {ILoginProps} from "../../interface/login";

const login = `<div class="centeredFlexContent">
    <h2>
        {{title}}
    </h2>
    <form>
        <div class="formInputs">
            {{#each inputs}}
                {{{this}}}
            {{/each}}
        </div>
        <div class="formButtons">
            {{{submitBtn}}}
            {{{linkToRegister}}}
        </div>
    </form>
</div>`

const content: ILoginProps = {
    title: 'Вход',
    inputs: [
        input({
            id: 'login',
            title: 'Введите свой логин',
            placeholder: 'Логин',
            required: true
        }),
        input({
            id: 'password',
            title: 'Введите свой пароль',
            placeholder: 'Пароль',
            required: true
        }),
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
    }),
}

const onFormSubmit = (e: SubmitEvent) => {
    console.log('Form submit', e)
    window.location.hash = '#chats'
}

class LoginPage extends Component<ILoginProps> {

    render(): Node | void {
        return this.compile(login, this._props);
    }
    addEvents() {
        super.addEvents();
        const form = this._element.querySelector('form')
            if (form) {
                console.log(form)
                form.addEventListener('submit', onFormSubmit)
            }
    }
    removeEvents() {
        super.removeEvents();
        const form = this._element.querySelector('form')
        if (form) {
            form.addEventListener('submit', onFormSubmit)
        }
    }
}

export default () => new LoginPage(
    'div',
    {
        ...content,
        attributes: {
            class: `centeredFlex`,
            // type: props.submit ? 'submit' : 'button',
            // disabled: props.disabled
        },
    }
)
