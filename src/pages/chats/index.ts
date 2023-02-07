import Handlebars from 'handlebars';
import chatsTemplate from './chats.hbs';
import {IChatsProps} from "../../interface/chat";
import {testChats} from "../../testData/chats";
import {Component} from "../../component";
import {IButtonProps} from "../../interface/button";

Handlebars.registerPartial('chats', chatsTemplate);

Handlebars.registerHelper('isMineMessage', (id: string) => {
    return id === '0';
});

Handlebars.registerHelper('isChatSelected', (id: string) => {
    return id === window.selectedChatId?.toString();
});

class Chats extends Component<IChatsProps> {

    render(): Node | void {
        const id: string | null = window.selectedChatId
        const chats = testChats

        const content: IChatsProps = {
            chats: chats,
            selectedChat: (id && chats[id])
                ? chats[id]
                : null
        }
        return this.compile(chatsTemplate(content), this._props);
    }
    addEvents() {
        super.addEvents();
        this._element.addEventListener('click', (e) => {
            console.log('click', e)
        })
    }
}

export default () => {
    const id: string | null = window.selectedChatId
    const chats = testChats

    const content: IChatsProps = {
        chats: chats,
        selectedChat: (id && chats[id])
            ? chats[id]
            : null
    }

    return new Chats(
        'div',
        {
            ...content,
            attributes: {
                // class: `button ${props.type}`,
                // type: props.submit ? 'submit' : 'button',
                // disabled: props.disabled
            },
        }
    )
}
