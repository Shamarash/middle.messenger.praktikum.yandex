export default `<div class="contacts">
        {{{profileLink}}}
            {{{contactsSearch}}}
            {{#if searchUsers}}
          
            <ul  class="searchContacts">
             {{#each searchUsers}}
             <li>
                            
                            {{#if this.avatar}}
                            <img class="contactAvatar" alt="contact avatar" src="{{this.avatar}}"/>
                        {{else}}
                            <div class="contactWithoutAvatar"></div>
                        {{/if}}

                        <div class="contactInfo">
                            <h4>{{this.login}}</h4>
                            <p>{{this.first_name}} {{this.second_name}}</p>
                        </div>
</li>
             {{else}}
                    <li class="empty">Никого не нашли</li>
             {{/each}}
             </ul>
      
            {{/if}}
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
                    // {{#each selectedChat.messages}}
                    //     <li class="message
                    // {{#if (isMineMessage this.to)}}messageMine{{/if}}
                    //         {{#if this.attachments}} messageImage{{/if}}">
                    //         {{#if this.text}}
                    //             <p>{{this.text}}</p>
                    //         {{else}}
                    //             {{#each this.attachments}}
                    //                 <img alt="message attachment" src="{{this.url}}"/>
                    //             {{/each}}
                    //         {{/if}}
                    //         {{#if this.read}}
                    //             <div class="readIcon"></div>{{/if}}
                    //         <div class="messageTime">{{this.dateTime}}</div>
                    //     </li>
                    // {{/each}}
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
