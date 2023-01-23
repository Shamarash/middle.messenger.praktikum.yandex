import Handlebars from 'handlebars';
import chatsTemplate from './chats.hbs';
import {IChatsProps} from "../../interface/chat";
import {testChats} from "../../testData/chats";

Handlebars.registerPartial('chats', chatsTemplate);

Handlebars.registerHelper('isMineMessage', (id: string) => {
    return id === '0';
});

Handlebars.registerHelper('isChatSelected', (id: string) => {
    return id === window.selectedChatId?.toString();
});


export default (): string => {

    const id: string | null = window.selectedChatId
    const chats = testChats

    const content: IChatsProps = {
        chats: chats,
        selectedChat: (id && chats[id])
            ? chats[id]
            : null
    }

    return chatsTemplate(content);
}