export default `{{#if isEdit}}
        <button class="goBackLink cancelEdit"></button>
    {{else}}
        {{{chatsLink}}}
    {{/if}}
    <div class="profileContent {{#if isEdit}} profileInputActive {{else}} profileInputDisabled {{/if}}">
        <div class="profileAvatarContainer">
            {{#if profile.avatar}}
                <img alt="profile avatar" src="{{avatarUrl}}" />
            {{else}}
                <div class="emptyAvatar"></div>
            {{/if}}
            {{#if isEdit}}
            <form class="profileAvatarForm">
                <input id="avatar" name="avatar" type="file"/>
                <label for="avatar">Поменять аватар</label>
                </form>
            {{/if}}
        </div>
        {{#if showProfileTitle}}
            <h3>
                {{profile.display_name}}
            </h3>
        {{/if}}
        <form class="profileForm">
            <div class="formInputs">
                {{#each inputs}}
                    {{{this}}}
                {{/each}}
            </div>
            <div class="formButtons">
                {{#if isEdit}}
                    <button type="submit" class="profileSubmitButton">
                        Сохранить
                    </button>
                {{else}}
                    <div class="formButtonsLeft">
                        <button class="secondaryButton changeProfile" type="button">
                            Изменить данные
                        </button>
                        <span class="divider"></span>
                        <button class="secondaryButton changePassword" type="button">
                            Изменить пароль
                        </button>
                        <span class="divider"></span>
                        <div class="exitLink">
                            Выйти
                        </div>
                    </div>
                {{/if}}
            </div>
        </form>
    </div>`
