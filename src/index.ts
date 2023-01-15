import './index.scss'
import login from './pages/login';
import register from './pages/register';

let root: HTMLElement = document.getElementById('root')!

interface IRoute {
	[key: string]: string
}

const routes: IRoute = {
	"login": login(),
	"/": login(),
	"register": register(),
};

function resolveRoute(route: string) {
	try {
		if (routes[route]) {
			root.innerHTML = routes[route]
		}
	} catch (e) {
		throw new Error(`Route ${route} not found`);

	}
}

function router() {

	const url = window.location.hash.slice(1) || '/';

	resolveRoute(url);
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);