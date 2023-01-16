import Handlebars from 'handlebars';
import register from './register.hbs';
import button from "../../components/button";
import {ButtonTypeEnum} from "../../enum/button";
import input from "../../components/input";
import link from "../../components/link";
import {InputTypeEnum} from "../../enum/input";

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
			id: 'Почта',
			title: 'Введите свой E-mail',
			placeholder: 'Почта'
		}),
		input({
			id: 'login',
			title: 'Введите свой логин',
			placeholder: 'Логин'
		}),
		input({
			id: 'name',
			title: 'Введите своё имя',
			placeholder: 'Имя'
		}),
		input({
			id: 'surname',
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
			placeholder: 'Пароль'
		}),
		input({
			id: 'password_repeat',
			title: 'Повторите пароль',
			placeholder: 'Пароль (ещё раз)'
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

export default (): string  => {
	return register(content);
}
