import './index.scss'
// import login from './pages/login/login'
// import chats from './pages/chats/chats'
// import register from './pages/register/register'
// import profile from './pages/profile/profile'
// import { notFound } from './pages/errors/notFound'
// import { serverError } from './pages/errors/serverError'
import Router from './router'
import Chats from './pages/chats'
import Store from './store'

window.store = Store

const router = new Router('.App')

router
  .use('/chats', Chats, 'div', {
    attributes: {
      class: 'chat'
    }
  }
  )
  .start()
