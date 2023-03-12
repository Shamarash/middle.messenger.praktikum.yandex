import Route from './route'

export default class Router {
  static _instance: any

  rootQuery
  routes: Route[] = []
  history
  currentRoute: Route | null = null

  constructor (rootQuery: string) {
    if (Router._instance) { return Router._instance }

    this.routes = []
    this.history = window.history
    this.currentRoute = null
    this.rootQuery = rootQuery

    Router._instance = this
  }

  use (path: string, component: any, tag = 'div', props = {}) {
    this.routes.push(new Route(path, component, tag, { ...props, rootQuery: this.rootQuery }))
    return this
  }

  start () {
    window.onpopstate = () => { this._onRoute(window.location.pathname) }
    this._onRoute(window.location.pathname)
  }

  go (path: string) {
    this.history?.pushState({}, '', path)
    this._onRoute(path)
  }

  back () {
    window.history.back()
  }

  forward () {
    window.history.forward()
  }

  _onRoute (path: string) {
    const route = this.getRoute(path)

    if (!route) {
      const notFound = this.getRoute('/404')
      if (notFound) {
        this.currentRoute = notFound
        notFound.render()
      }
      return
    }

    if (this.currentRoute && this.currentRoute !== route) { this.currentRoute.leave() }

    this.currentRoute = route

    route.render()
  }

  getRoute (path: string) {
    return this.routes?.find(route => route.match(path))
  }
}
