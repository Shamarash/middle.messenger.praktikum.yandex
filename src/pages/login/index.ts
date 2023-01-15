import Handlebars from 'handlebars';
import login from './login.hbs';
import button from "../../components/button";
import {ButtonTypeEnum} from "../../enum/button";
import input from "../../components/input";
import link from "../../components/link";

Handlebars.registerPartial('login', login);

interface ILoginProps {
	title: string
	inputs: (() => HTMLElement)[]
	submitBtn: HTMLElement
	linkToRegister: HTMLElement
}

const content: ILoginProps = {
	title: 'Вход',
	inputs: [
		input({
			id: 'login',
			label: 'Логин',
			title: 'Введите свой логин',
			placeholder: 'Введите логин'
		}),
		input({
			id: 'login',
			label: 'Логин',
			title: 'Введите свой логин',
			placeholder: 'Введите логин'
		}),
	],
	submitBtn: button({
		name: 'Войти',
		type: ButtonTypeEnum.primary,
		disabled: false
	}),
	linkToRegister: link({
		name: 'Нет аккаунта? Зарегистрироваться',
		href: '#register'
	}),
}

export default (): string  => {
	return login(content);
}