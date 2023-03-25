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
                <button class="messagesHeaderDots"></button>
            </div>
            <div class="messagesList">
                <ul>
                    {{#each messages}}
                        <li class="message
                    {{#if (isMineMessage this.to)}}messageMine{{/if}}
                            {{#if this.attachments}} messageImage{{/if}}">
                            {{#if this.text}}
                                <p>{{this.text}}</p>
                            {{else}}
                                {{#each this.attachments}}
                                    <img alt="message attachment" src="{{this.url}}"/>
                                {{/each}}
                            {{/if}}
                            {{#if this.read}}
                                <div class="readIcon"></div>{{/if}}
                            <div class="messageTime">{{this.dateTime}}</div>
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
