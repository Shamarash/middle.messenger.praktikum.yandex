import Handlebars from 'handlebars';
import chatsTemplate from './chats.hbs';
import img from '../../images/camera.png'
import code from '../../images/code.png'
Handlebars.registerPartial('chats', chatsTemplate);
Handlebars.registerHelper('isMineMessage',  (id: string) => {
	return id === '0';
});

Handlebars.registerHelper('isChatSelected',  (id: string) => {
	return id === window.selectedChatId?.toString();
});

enum MessageTypeEnum {
	text = 'text',
	sticker = 'sticker',
}
enum AttachmentEnum {
	image = 'image',
	video = 'video',
	file = 'file',
	location = 'file',
}
interface IAttachment {
	type: AttachmentEnum,
	url?: string,
}

interface IMessage {
	read: boolean,
	from: string,
	to: string,
	type: MessageTypeEnum
	text: string | null,
	dateTime: string,
	attachments: IAttachment[]
}

interface IChat {
	person: {
		id: string
		name: string
	},
	messages: IMessage[]
}

interface IChats {
	[key: string]: IChat
}

interface IChatsProps {
	chats: IChats
	selectedChat: IChat | null
}

const randomTime = (): string => {
	const hours = Math.floor( Math.random() * 24 )
	const minutes = Math.floor( Math.random() * 60 )

	return `${(hours<10) ? ('0' + hours) : hours}:${(minutes<10) ? ('0' + minutes) : minutes}`
}

const chats: IChats = {
	'1' : {
		person: {
			id: '1',
			name: 'Peter'
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
	'2' : {
		person: {
			id: '2',
			name: 'Shrek'
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
}

export default (): string  => {

	const id: string | null = window.selectedChatId

	const content: IChatsProps = {
		chats: chats,
		selectedChat: (id && chats[id])
			? chats[id]
			: null
	}

	return chatsTemplate(content);
}