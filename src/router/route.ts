import renderDOM from '../utils/render'
import Component from '../component'

export default class Route {
  Component: typeof Component<any>
  path
  block: Component<any> | null
  props: Record<string, any>
  tag

  constructor (path: string, component: typeof Component<any>, tag = 'div', props = {}) {
    this.path = path
    this.Component = component
    this.block = null
    this.props = props
    this.tag = tag
  }

  render () {
    if (!this.block) {
      this.block = new this.Component(this.tag, this.props)
      if (this.block) {
        renderDOM(this.props.rootQuery, this.block)
      }
      return
    }

    this.block.show()
  }

  navigate (path: string) {
    if (this.match(path)) {
      this.render()
    }
  }

  leave () {
    if (this.block) {
      this.block.hide()
    }
  }

  match (path: string) {
    if (this.props.withId) {
      return path.includes(this.path)
    }
    return path === this.path
  }
}
