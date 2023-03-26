export default `<ul class="contactsList">
{{#if isSearch}}
 {{#each users}}
             <li id="{{this.id}}">
                            {{#if this.avatar}}
                            <img class="contactAvatar" alt="contact avatar" src="{{this.avatar}}"/>
                        {{else}}
                            <div class="headerWithoutAvatar"></div>
                        {{/if}}

                        <div class="contactInfo">
                            <h4>{{this.login}}</h4>
                            <p>{{this.first_name}} {{this.second_name}}</p>
                        </div>
</li>
             {{else}}
                    <li class="empty">Никого не нашли</li>
             {{/each}}
{{else}}
{{#each chatList}}
                    <li id="{{this.id}}" class="{{#if this.selected}}selectedChat{{/if}}">
                        {{#if this.person.avatar}}
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

{{/if}}
</ul>
`
