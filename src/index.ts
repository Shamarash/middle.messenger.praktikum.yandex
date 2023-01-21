import './index.scss'
import login from './pages/login';
import chats from './pages/chats';
import register from './pages/register';
import profile from './pages/profile';
import errorPage from "./components/errorPage";

let root: HTMLElement = document.getElementById('root')!

const getRoute = (route: string, pathname: string): string => {
    if (pathname !== '/') {
        return errorPage({code: 404, text: 'Не туда попали'})
    }
    switch (route) {
        case 'login': case '/' :
            return login()
        case 'chats':
            return chats()
        case 'register':
            return register()
        case 'profile':
            return profile()
        default :
            return errorPage({code: 404, text: 'Не туда попали'})
    }
};

function resolveRoute(route: string, pathname: string) {
    try {
        root.innerHTML = getRoute(route, pathname)
    } catch (e) {
        throw new Error(`Route ${route} not found`);
    }
}

function router() {
    const route = window.location.hash.slice(1) || '/';
    const pathname = window.location.pathname
    resolveRoute(route, pathname);
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
window.addEventListener('selectedChatChange', router);
window.addEventListener('profileStateChange', router);