import Handlebars from 'handlebars';
import register from './register.hbs';
import button from "../../components/button";
import {ButtonTypeEnum} from "../../enum/button";
import input from "../../components/input";
import link from "../../components/link";

Handlebars.registerPartial('register', register);

interface IRegisterProps {
    title: string
    inputs: (() => HTMLElement)[]
    submitBtn: HTMLElement
    linkToLogin: HTMLElement
}

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

export default (): string => {
    return register(content);
}
