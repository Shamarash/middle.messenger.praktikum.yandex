export default `<div class="contacts">
        {{{profileLink}}}
        <button class="addChatButton" id="addChatButton">Создать новый чат</button>
        {{{addChatModal}}}
        {{{addUserModal}}}
            {{{contacts}}}
    </div>
    <div class="messages">
        {{#if selectedChatId}}
            <div class="messagesHeader">
                <div class="messagesHeaderProfile">
                <div class="avatarContainer">
                    {{#if selectedChat.avatar}}
                        <img class="messagesHeaderAvatar" alt="selected chat person avatar"
                             src="{{selectedChat.avatar}}"/>
                    {{else}}
                        <input id="chatAvatarInput" class="chatAvatarInput" type="file"/>
<h5>Выбрать аватар</h5>
                         <button id="chatAvatarUpdate" class="chatAvatarUpdate">Сохранить</button>
                      
                    {{/if}}
                    </div>

                </div>
                                    <h3 class="messagesHeaderTitle">{{selectedChat.title}}</h3>
                <button id="addUserToChat">Участники чата</button>
                <button id="deleteChat" class="messagesHeaderDots">Удалить чат</button>
            </div>
            <div class="messagesList">
                <ul>
                    {{#each messages}}
                    {{log this}}
                        <li class="message
                    {{#if this.isMineMessage}}messageMine{{/if}}
                            {{#if this.file}} messageImage{{/if}}">
                            {{#if this.content}}
                                <p>{{this.content}}</p>
                            {{else}}
                                {{#if this.file}}
                                    <img alt="message attachment" src="{{this.file.path}}"/>
                            {{/if}}
                            {{/if}}
                          {{#if this.is_read}}
                                <div class="readIcon"></div>
                                {{/if}}
                            <div class="messageTime">{{this.time}}</div>
                             {{#if this.isMineMessage}}
                             {{else}}
                            <h5 class="messageLogin">{{this.login}}</h5>
                            {{#if this.avatar}}
                            <img class="messageAvatar" alt="message avatar" src="{{this.avatar}}"/>
                            {{else}}
                            <div class="messageEmptyAvatar"></div>
                            {{/if}}
                            {{/if}}
                        </li>
                    {{/each}}
                </ul>
            </div>
            <form id="messageSendForm" class="messageInputContainer">
                <button class="messageAttachment"></button>
                <input placeholder="Сообщение" name="message"  class="messageInput" required></input>
                <button type="submit" class="sendMessage"></button>
            </form>
        {{else}}
            <div class="centeredFlex">
                <p>Выберите чат, чтобы отправить сообщение</p>
            </div>
        {{/if}}
    </div>`
