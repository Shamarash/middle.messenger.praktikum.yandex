export default `<ul class="contactsList">
{{#each chatList}}
                    <li id="{{this.id}}" class="{{#if this.selected}}selectedChat{{/if}}">
                        {{#if this.avatar}}
                            <img class="contactAvatar" alt="contact avatar" src={{this.avatar}}/>
                        {{else}}
                            <div class="contactWithoutAvatar"></div>
                        {{/if}}

                        <div class="contactInfo">
                            <h4>{{this.title}}</h4>
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
`
