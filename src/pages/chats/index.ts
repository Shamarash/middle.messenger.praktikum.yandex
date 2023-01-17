import Handlebars from 'handlebars';
import chatsTemplate from './chats.hbs';

Handlebars.registerPartial('chats', chatsTemplate);

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
				dateTime: Date.now().toString(),
				attachments: []
			},
			{
				read: true,
				from: '0',
				to: '1',
				type: MessageTypeEnum.text,
				text: 'Hi',
				dateTime: Date.now().toString(),
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
				dateTime: Date.now().toString(),
				attachments: []
			},
			{
				read: true,
				from: '0',
				to: '2',
				type: MessageTypeEnum.text,
				text: 'Hi donkey',
				dateTime: Date.now().toString(),
				attachments: []
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