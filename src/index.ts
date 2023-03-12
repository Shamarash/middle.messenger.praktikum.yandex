import './index.scss'
// import login from './pages/login/login'
// import chats from './pages/chats/chats'
// import register from './pages/register/register'
// import profile from './pages/profile/profile'
// import { notFound } from './pages/errors/notFound'
// import { serverError } from './pages/errors/serverError'
// import Chats from './pages/chats'
import Store from './store'
import { router } from './router'
import { notFound } from './pages/errors/notFound'
import { login } from './pages/login'
import { register } from './pages/register'
import Chats from './pages/chats'
import Profile from './pages/profile'

window.store = Store

router
  .use('/404', notFound)
  .use('/register', register)
  .use('/chats', Chats)
  .use('/profile', Profile)
  .use('/login', login)
  .start()
