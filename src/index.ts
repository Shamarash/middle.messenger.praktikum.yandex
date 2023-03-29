import './index.scss'
import Store from './store'
import { router } from './router'
import LoginPage, { loginProps } from './pages/login'
import Register, { registerProps } from './pages/register'
import Chats, { chatsProps } from './pages/chats'
import Profile from './pages/profile'
import handlebars from 'handlebars'
import ErrorPage, { errorPageProps } from './components/errorPage'

window.store = Store

handlebars.registerHelper('log', function (something) {
  console.log('handlebars log', something)
})

router
  .use('/404', ErrorPage, 'div', { ...errorPageProps, code: 404, text: 'Не туда попали' })
  .use('/sign-up', Register, 'div', registerProps)
  .use('/messenger', Chats, 'div', chatsProps)
  .use('/settings', Profile, 'div', {})
  .use('/sign-in', LoginPage, 'div', loginProps)
  .start()
