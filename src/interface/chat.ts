import {AttachmentEnum, MessageTypeEnum} from "../enum/chat";
import {IBaseProps} from "./component";

export interface IAttachment {
    type: AttachmentEnum,
    url?: string,
}

export interface IMessage extends IBaseProps {
    read: boolean,
    from: string,
    to: string,
    type: MessageTypeEnum
    text: string | null,
    dateTime: string,
    attachments: IAttachment[]
}

export interface IChat extends IBaseProps {
    person: {
        id: string
        name: string
        avatar: string | null
        lastMessage: {
            fromMe: boolean
            text: string
            dateTime: string
        } | null
        unreadCounter: number | null
    },
    messages: IMessage[]
}

export interface IChats {
    [key: string]: IChat
}

export interface IChatsProps extends IBaseProps {
    chats: IChats
    selectedChat: IChat | null
}
