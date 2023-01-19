import Handlebars from 'handlebars';
import profile from './profile.hbs';
import input from "../../components/input";
import {InputTypeEnum} from "../../enum/input";
import {testProfile} from "../../testData/profile";

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

Handlebars.registerHelper('showProfileTitle', () => {
	return window.profileState === ProfileStateEnum.normal
		|| window.profileState === undefined
});

const profileInfoInputs = (isEdit: boolean) => [
		input({
			id: 'email',
			title: 'Введите свой E-mail',
			placeholder: 'Почта',
			required: true,
			disabled: !isEdit,
			value: testProfile.email
		}),
		input({
			id: 'login',
			title: 'Введите свой логин',
			placeholder: 'Логин',
			required: true,
			disabled: !isEdit,
			value: testProfile.login
		}),
		input({
			id: 'first_name',
			title: 'Введите своё имя',
			placeholder: 'Имя',
			required: true,
			disabled: !isEdit,
			value: testProfile.first_name
		}),
		input({
			id: 'second_name',
			title: 'Введите свою фамилию',
			placeholder: 'Фамилия',
			disabled: !isEdit,
			value: testProfile.second_name
		}),
		input({
			id: 'display_name',
			title: 'Введите имя для чата',
			placeholder: 'Имя в чате',
			disabled: !isEdit,
			value: testProfile.display_name
		}),
		input({
			id: 'phone',
			title: 'Введите номер телефона',
			placeholder: 'Номер телефона',
			disabled: !isEdit,
			value: testProfile.phone
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
				inputs: profileInfoInputs(false)
			}
		}
		case ProfileStateEnum.changeInfo : {
			return {
				isEdit: true,
				inputs: profileInfoInputs(true)
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
	console.log({...getCurrentContent(state), profile: testProfile})
	return profile({...getCurrentContent(state), profile: testProfile});
}
