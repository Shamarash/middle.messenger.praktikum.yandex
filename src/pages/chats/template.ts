export default `<div class="contacts">
        {{{profileLink}}}
            {{{contactsSearch}}}
            {{{contacts}}}
    </div>
    <div class="messages">
        {{#if selectedChat}}
            <div class="messagesHeader">
                <div class="messagesHeaderProfile">
                    {{#if selectedChat.person.avatar}}
                        <img class="messagesHeaderAvatar" alt="selected chat person avatar"
                             src={{selectedChat.person.avatar}}/>
                    {{else}}
                        <div class="headerWithoutAvatar"></div>
                    {{/if}}
                    <h3 class="messagesHeaderTitle">{{selectedChat.person.name}}</h3>
                </div>
                <button id="deleteChat" class="messagesHeaderDots">Удалить чат</button>
            </div>
            <div class="messagesList">
                <ul>
                    {{#each messages}}
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
                          
                                <div class="readIcon"></div>
                            <div class="messageTime">{{this.time}}</div>
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
