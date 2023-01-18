import Handlebars from 'handlebars';
import profile from './profile.hbs';
import input from "../../components/input";
import {InputTypeEnum} from "../../enum/input";

Handlebars.registerPartial('profile', profile);

enum ProfileStateEnum {
	normal = 'normal',
	changeInfo = 'changeInfo',
	changePassword = 'changePassword'
}

interface IProfileProps {
	isEdit: boolean
	inputs: (() => HTMLElement)[]
}

const profileInfoInputs = [
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
			id: 'display_name',
			title: 'Введите имя для чата',
			placeholder: 'Имя в чате'
		}),
		input({
			id: 'phone',
			title: 'Введите номер телефона',
			placeholder: 'Номер телефона'
		}),
	]

const changePasswordInputs = [
		input({
			id: 'oldPassword',
			title: 'Введите cтарый пароль',
			placeholder: 'Старый пароль',
			required: true,
			type: InputTypeEnum.password
		}),
	input({
		id: 'newPassword',
		title: 'Введите новый пароль',
		placeholder: 'Новый пароль',
		required: true,
		type: InputTypeEnum.password
	}),
		input({
			id: 'newPasswordRepeat',
			title: 'Повторите новый пароль',
			placeholder: 'Повторите новый пароль',
			required: true,
			type: InputTypeEnum.password
		}),
	]

const getCurrentContent = (state: string | null) : IProfileProps => {

	switch (state) {
		default : case ProfileStateEnum.normal : {
			return {
				isEdit: false,
				inputs: profileInfoInputs
			}
		}
		case ProfileStateEnum.changeInfo : {
			return {
				isEdit: true,
				inputs: profileInfoInputs
			}
		}
		case ProfileStateEnum.changePassword : {
			return {
				isEdit: true,
				inputs: changePasswordInputs
			}
		}
	}
}

export default (): string  => {

	const state: string | null = window.profileState
	console.log(getCurrentContent(state))
	return profile(getCurrentContent(state));
}
