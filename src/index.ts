import './index.scss'
import login from './pages/login';
import chats from './pages/chats';
import register from './pages/register';

let root: HTMLElement = document.getElementById('root')!

const getRoute = (route: string): string => {
    switch (route) {
        case "login":
            return login()
        case    "chats":
            return chats()
        case "register":
            return register()
        default :
            return login()
    }
};

function resolveRoute(route: string) {
    try {
        root.innerHTML = getRoute(route)
    } catch (e) {
        console.log(e)
        throw new Error(`Route ${route} not found`);

    }
}

function router() {
    const url = window.location.hash.slice(1) || '/';
    resolveRoute(url);
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
window.addEventListener('selectedChatChange', router);