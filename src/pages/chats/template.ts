export default `<div class="contacts">
        <a href="#profile" class="linkToProfile">Профиль</a>
        <div class="searchContainer">
            <input id="search" placeholder="Поиск"/>
            <label for="search"/>
        </div>
        <div class="contactsList">
            <ul>
                {{#each chats}}
                    <li class="{{#if (isChatSelected @key)}}selectedChat{{/if}}" onclick="(function() {
                            window.selectedChatId = {{@key}}
                            window.dispatchEvent(new CustomEvent('selectedChatChange'))
                            })()">
                        {{#if this.person.avatar}}
                            <img class="contactAvatar" alt="contact avatar" src={{this.person.avatar}}/>
                        {{else}}
                            <div class="contactWithoutAvatar"/>
                        {{/if}}

                        <div class="contactInfo">
                            <h4>{{this.person.name}}</h4>
                            <p>
                                {{#if selectedChat}}<span>Вы:</span>{{/if}}
                                {{this.person.lastMessage.text}}
                            </p>
                        </div>
                        <div class="contactMessageInfo">
                            <span class="lastMessageTime">
                                {{this.person.lastMessage.dateTime}}
                            </span>
                            {{#if this.person.unreadCounter}}
                                <span class="unreadMessagesCounter">
                                    {{this.person.unreadCounter}}
                                </span>
                            {{/if}}

                        </div>
                    </li>
                {{else}}
                    <li class="empty">Список чатов пуст</li>
                {{/each}}
            </ul>
        </div>
    </div>
    <div class="messages">
        {{#if selectedChat}}
            <div class="messagesHeader">
                <div class="messagesHeaderProfile">
                    {{#if selectedChat.person.avatar}}
                        <img class="messagesHeaderAvatar" alt="selected chat person avatar"
                             src={{selectedChat.person.avatar}}/>
                    {{else}}
                        <div class="messagesHeaderWithoutAvatar"></div>
                    {{/if}}
                    <h3 class="messagesHeaderTitle">{{selectedChat.person.name}}</h3>
                </div>
                <button class="messagesHeaderDots"></button>
            </div>
            <div class="messagesList">
                <ul>
                    {{#each selectedChat.messages}}
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
            <form class="messageInputContainer">
                <button class="messageAttachment"></button>
                <input placeholder="Сообщение" name="message" class="messageInput" required></input>
                <button type="submit" class="sendMessage"></button>
            </form>
        {{else}}
            <div class="centeredFlex">
                <p>Выберите чат, чтобы отправить сообщение</p>
            </div>
        {{/if}}
    </div>`
