import Handlebars from 'handlebars';
import input from "../../components/input";
import {InputTypeEnum} from "../../enum/input";
import {testProfile} from "../../testData/profile";
import {ProfileStateEnum} from "../../enum/profile";
import {Component} from "../../component";
import {IProfileProps} from "../../interface/profile";

const profile = `    {{#if isEdit}}
        <button class="goBackLink" onclick="(function() {
            window.profileState = 'normal'
            window.dispatchEvent(new CustomEvent('profileStateChange'))
                        })()"></button>
    {{else}}
        <a href="#chats" class="goBackLink"></a>
    {{/if}}
    <div class="profileContent {{#if isEdit}} profileInputActive{{else}} profileInputDisabled{{/if}}">
        <div class="profileAvatarContainer">
            {{#if profile.avatar}}
                <img alt="profile avatar" src={{profile.avatar}}/>
            {{else}}
                <div class="emptyAvatar"></div>
            {{/if}}
            {{#if isEdit}}
                <input id="avatar" name="avatar" type="file"/>
                <label for="avatar">Поменять аватар</label>
            {{/if}}
        </div>
        {{#if (showProfileTitle)}}
            <h3>
                {{profile.display_name}}
            </h3>
        {{/if}}
        <form>
            <div class="formInputs">
                {{#each inputs}}
                    {{{this}}}
                {{/each}}
            </div>
            <div class="formButtons">
                {{#if isEdit}}
                    <button onclick="(function() {
                    window.profileState = 'normal'
            window.dispatchEvent(new CustomEvent('profileStateChange'))
                        })()">
                        Сохранить
                    </button>
                {{else}}
                    <div class="formButtonsLeft">
                        <button class="secondaryButton" onclick="(function() {
                    window.profileState = 'changeInfo'
            window.dispatchEvent(new CustomEvent('profileStateChange'))
                        })()">
                            Изменить данные
                        </button>
                        <span class="divider"></span>
                        <button class="secondaryButton" onclick="(function() {
                     window.profileState = 'changePassword'
            window.dispatchEvent(new CustomEvent('profileStateChange'))
                        })()">
                            Изменить пароль
                        </button>
                        <span class="divider"></span>
                        <a href="#login" class="exitLink">
                            Выйти
                        </a>
                    </div>
                {{/if}}
            </div>
        </form>
    </div>`

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
        return this.compile(profile, this._props);
    }
    addEvents() {
        super.addEvents();
        this._element.addEventListener('click', (e) => {
            console.log('click', e)
        })
    }
}

export default (props: IProfileProps) => {
    const state: string | null = window.profileState

    return new Profile(
        'div',
        {
            ...getCurrentContent(state),
            profile: testProfile,
            attributes: {
                class: `centeredFlex`,
            },
        }
    )
}
