export default `
<div class="modal">
<h3 class="modalTitle">Участники</h3>
<div id="userList" class="scrollContainer">
{{#each currentUsers}}
<div class="addUserRow">
    {{#if this.avatar}}
<img class="contactAvatar" alt="contact avatar" src="{{this.avatar}}"/>
    {{else}}
<div class="headerWithoutAvatar"></div>
{{/if}}
<p>{{this.login}}</p>
<button id="{{this.id}}" class="deleteUserButton">Удалить</button>
</div>
{{else}}
    <div class="empty">Пока никого в чате нет</div>
    {{/each}}
    </div>
<div class="divider"></div>
<h3 class="modalTitle">Добавить новых</h3>
<input id="addUserInput" placeholder="Добавить нового пользователя"/>
<div id="addUserList" class="scrollContainer">
{{#each usersToAdd}}
<div class="addUserRow">
    {{#if this.avatar}}
<img class="contactAvatar" alt="contact avatar" src="{{this.avatar}}"/>
    {{else}}
<div class="headerWithoutAvatar"></div>
{{/if}}
<p>{{this.login}}</p>
<button id="{{this.id}}" class="addUserButton">Добавить</button>
</div>
{{else}}
{{#if search}}
    <div class="empty">Никого не нашли</div>
    {{/if}}
    {{/each}}
    </div>
</div>
`
