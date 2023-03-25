import './index.scss'
import Store from './store'
import { router } from './router'
import LoginPage, { loginProps } from './pages/login'
import Register, { registerProps } from './pages/register'
import Chats, { chatsProps } from './pages/chats'
import Profile from './pages/profile'
import handlebars from 'handlebars'
import ErrorPage, { errorPageProps } from './components/errorPage'
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import MessageController from './controllers/MessageController'

window.store = Store

handlebars.registerHelper('log', function (something) {
  console.log('handlebars log', something)
})

router
  .use('/404', ErrorPage, 'div', { ...errorPageProps, code: 404, text: 'Не туда попали' })
  .use('/register', Register, 'div', registerProps)
  .use('/chats', Chats, 'div', chatsProps)
  .use('/profile', Profile, 'div', {})
  .use('/login', LoginPage, 'div', loginProps)
  .start()
