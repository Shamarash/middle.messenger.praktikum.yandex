export default `{{#if isEdit}}
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
