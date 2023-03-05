import './index.scss'
import login from './pages/login/login'
import chats from './pages/chats/chats'
import register from './pages/register/register'
import profile from './pages/profile/profile'
import { notFound } from './pages/errors/notFound'
import { serverError } from './pages/errors/serverError'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root: HTMLElement = document.getElementById('root')!

const getRoute = (route: string, pathname: string): HTMLElement => {
  if (pathname !== '/') {
    return notFound().getContent()
  }
  switch (route) {
    case 'login':
    case '/' :
      return login().getContent()
    case 'chats':
      return chats().getContent()
    case 'register':
      return register().getContent()
    case 'profile':
      return profile().getContent()
    case '500':
      return serverError().getContent()
    default :
      return notFound().getContent()
  }
}

function resolveRoute (route: string, pathname: string) {
  try {
    root.textContent = ''
    root.appendChild(getRoute(route, pathname))
  } catch (e) {
    throw new Error(`Route ${route} not found`)
  }
}

function router () {
  const route = window.location.hash.slice(1) || '/'
  const pathname = window.location.pathname
  resolveRoute(route, pathname)
}

window.addEventListener('load', router)
window.addEventListener('hashchange', router)
window.addEventListener('selectedChatChange', router)
window.addEventListener('profileStateChange', router)
