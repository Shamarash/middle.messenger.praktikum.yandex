export default `{{#each chats}}
                    <li class="{{#if (isChatSelected @key)}}selectedChat{{/if}}" onclick="(function() {
                            window.selectedChatId = {{@key}}
                            window.dispatchEvent(new CustomEvent('selectedChatChange'))
                            })()">
                        {{#if this.person.avatar}}
                            <img class="contactAvatar" alt="contact avatar" src={{this.person.avatar}}/>
                        {{else}}
                            <div class="contactWithoutAvatar"></div>
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
`
