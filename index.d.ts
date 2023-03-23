import Store from './src/store'
import MessageController from './src/controllers/MessageController'
import chatsController from "./src/controllers/ChatsController";

export {}

declare global {
  module '*.hbs'
  module '*.png'
  interface Window {
    store: typeof Store
    messagesController: typeof MessageController
    chatsController: typeof chatsController
  }
}
