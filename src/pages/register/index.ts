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
	linkToRegister: HTMLElement
}

const content: IRegisterProps = {
	title: 'Регистрация',
	inputs: [
		input({
			id: 'login',
			label: 'Логин',
			title: 'Введите свой логин',
			placeholder: 'Введите логин'
		}),
		input({
			id: 'password',
			type: InputTypeEnum.password,
			label: 'Пароль',
			title: 'Введите свой пароль',
			placeholder: 'Введите пароль'
		}),
	],
	submitBtn: button({
		name: 'Зарегистрироваться',
		type: ButtonTypeEnum.primary,
		disabled: false
	}),
	linkToRegister: link({
		name: 'Уже зарегистрированы? Войти',
		href: '#login'
	}),
}

export default (): string  => {
	return register(content);
}
