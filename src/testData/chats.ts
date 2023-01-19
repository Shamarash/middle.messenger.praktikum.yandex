import img from "../images/camera.png";
import code from "../images/code.png";
import {AttachmentEnum, MessageTypeEnum} from "../enum/chat";
import {IChats} from "../interface/chat";
import {randomTime} from "../utils/randomTime";

export const testChats: IChats = {
    '1': {
        person: {
            id: '1',
            name: 'Peter',
            avatar: img,
            lastMessage: {
                fromMe: true,
                text: 'last message',
                dateTime: randomTime()
            },
            unreadCounter: 4
        },
        messages: [
            {
                read: true,
                from: '1',
                to: '0',
                type: MessageTypeEnum.text,
                text: 'Hello',
                dateTime: randomTime(),
                attachments: []
            },
            {
                read: true,
                from: '0',
                to: '1',
                type: MessageTypeEnum.text,
                text: 'Hi',
                dateTime: randomTime(),
                attachments: []
            },
        ]
    },
    '2': {
        person: {
            id: '2',
            name: 'Shrek2',
            avatar: '',
            lastMessage: {
                fromMe: true,
                text: 'last last last last message',
                dateTime: randomTime()
            },
            unreadCounter: 49876
        },
        messages: [
            {
                read: true,
                from: '2',
                to: '0',
                type: MessageTypeEnum.text,
                text: 'Hello donkey',
                dateTime: randomTime(),
                attachments: []
            },
            {
                read: true,
                from: '0',
                to: '2',
                type: MessageTypeEnum.text,
                text: 'Hello Hello Hello',
                dateTime: randomTime(),
                attachments: []
            },
            {
                read: true,
                from: '2',
                to: '0',
                type: MessageTypeEnum.text,
                text: 'Hello Hello Hello',
                dateTime: randomTime(),
                attachments: []
            },
            {
                read: true,
                from: '0',
                to: '2',
                type: MessageTypeEnum.text,
                text: 'Hello Hello Hello',
                dateTime: randomTime(),
                attachments: []
            },
            {
                read: true,
                from: '2',
                to: '0',
                type: MessageTypeEnum.text,
                text: 'Hello Hello Hello',
                dateTime: randomTime(),
                attachments: []
            },
            {
                read: true,
                from: '0',
                to: '2',
                type: MessageTypeEnum.text,
                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
                dateTime: randomTime(),
                attachments: []
            },
            {
                read: true,
                from: '2',
                to: '0',
                type: MessageTypeEnum.text,
                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
                dateTime: randomTime(),
                attachments: []
            },
            {
                read: true,
                from: '0',
                to: '2',
                type: MessageTypeEnum.text,
                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
                dateTime: randomTime(),
                attachments: []
            },
            {
                read: true,
                from: '2',
                to: '0',
                type: MessageTypeEnum.text,
                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
                dateTime: randomTime(),
                attachments: []
            },
            {
                read: true,
                from: '2',
                to: '0',
                type: MessageTypeEnum.text,
                text: null,
                dateTime: randomTime(),
                attachments: [
                    {
                        type: AttachmentEnum.image,
                        url: img
                    }
                ]
            },
            {
                read: true,
                from: '0',
                to: '2',
                type: MessageTypeEnum.text,
                text: null,
                dateTime: randomTime(),
                attachments: [
                    {
                        type: AttachmentEnum.image,
                        url: code
                    }
                ]
            },
        ]
    },

    '3': {
        person: {
            id: '3',
            name: 'Peter 123',
            avatar: null,
            lastMessage: null,
            unreadCounter: null
        },
        messages: [
            {
                read: true,
                from: '1',
                to: '0',
                type: MessageTypeEnum.text,
                text: 'Hello',
                dateTime: randomTime(),
                attachments: []
            },
            {
                read: true,
                from: '0',
                to: '1',
                type: MessageTypeEnum.text,
                text: 'Hi',
                dateTime: randomTime(),
                attachments: []
            },
        ]
    },
}