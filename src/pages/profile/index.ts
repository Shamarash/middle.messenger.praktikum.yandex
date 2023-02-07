import Handlebars from 'handlebars';
import profile from './profile.hbs';
import input from "../../components/input";
import {InputTypeEnum} from "../../enum/input";
import {testProfile} from "../../testData/profile";
import {ProfileStateEnum} from "../../enum/profile";
import {Component} from "../../component";
import {IButtonProps} from "../../interface/button";
import {IProfileProps} from "../../interface/profile";

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

const getCurrentContent = (state: string | null): IProfileProps => {

    switch (state) {
        default :
        case ProfileStateEnum.normal : {
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

class Profile extends Component<IProfileProps> {

    render(): Node | void {
        const state: string | null = window.profileState
        return this.compile(profile({...getCurrentContent(state), profile: testProfile}), this._props);
    }
    addEvents() {
        super.addEvents();
        this._element.addEventListener('click', (e) => {
            console.log('click', e)
        })
    }
}

export default () => {
    const state: string | null = window.profileState

    return new Profile(
        'div',
        {
            ...getCurrentContent(state),
            profile: testProfile,
            attributes: {
                // class: `button ${props.type}`,
                // type: props.submit ? 'submit' : 'button',
                // disabled: props.disabled
            },
        }
    )
}
