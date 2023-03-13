import { EventBus } from './eventBus'
import { v4 as uuidv4 } from 'uuid'
import Handlebars from 'handlebars'
import { EventsWithSelector } from './interface/component'

enum EventsEnum {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render'
}

interface IMeta<T> {
  tagName: string
  props: T
}

type IAttribute = [string, boolean | string | undefined]

export type IObject = Record<string, any>

export class Component<T extends IObject> {
  private _element: HTMLElement = document.createElement('div')
  readonly _meta: IMeta<T>
  protected _props: IObject
  readonly _eventBus: EventBus
  private _children: IObject
  readonly _id: string

  constructor (tagName = 'div', propsAndChilds: T) {
    const { children, props } = this.getChildren(propsAndChilds)
    this._eventBus = new EventBus()
    this._id = uuidv4()
    this._meta = {
      tagName,
      props
    }
    this._children = this.makePropsProxy(children)
    this._props = this.makePropsProxy({ ...props, __id: this._id })
    this._registerEvents()
    this._eventBus.emit(EventsEnum.INIT)
  }

  _registerEvents () {
    this._eventBus.on(EventsEnum.INIT, this.init.bind(this))
    this._eventBus.on(EventsEnum.FLOW_CDM, this._componentDidMount.bind(this))
    this._eventBus.on(EventsEnum.FLOW_RENDER, this._render.bind(this))
    this._eventBus.on(EventsEnum.FLOW_CDU, this._componentDidUpdate.bind(this))
  }

  createDocumentElement (tag: string) {
    const el = document.createElement(tag)
    if (this._props.settings?.withId) {
      el.setAttribute('data-id', this._id)
    }
    return el
  }

  init () {
    this._element = this.createDocumentElement(this._meta?.tagName)
    this._eventBus.emit(EventsEnum.FLOW_RENDER)
  }

  _render () {
    const block = this.render()
    this.removeEvents()
    this._element.innerHTML = ''

    if (block instanceof Node) {
      this._element.appendChild(block)
    }

    this.addEvents()
    this.addAttributes()
  }

  render (): Node | void {
  }

  addEvents () {
    const { events = {}, eventsWithSelector } = this._props
    Object.keys(events).forEach(eventName => {
      const func = events[eventName].bind(this)
      this._element.addEventListener(eventName, func)
    })

    if (eventsWithSelector) {
      Object.keys(eventsWithSelector as EventsWithSelector).forEach(selector => {
        const el = this._element.querySelector(selector)
        if (el) {
          Object.keys(eventsWithSelector[selector]).forEach(eventName => {
            const func = eventsWithSelector[selector][eventName].bind(this)
            el.addEventListener(eventName, func)
          })
        }
      })
    }
  }

  removeEvents () {
    const { events = {}, eventsWithSelector } = this._props
    Object.keys(events).forEach(eventName => {
      const func = events[eventName].bind(this)
      this._element.removeEventListener(eventName, func)
    })

    if (eventsWithSelector) {
      Object.keys(eventsWithSelector as EventsWithSelector).forEach(selector => {
        const el = this._element.querySelector(selector)
        if (el) {
          Object.keys(eventsWithSelector[selector]).forEach(eventName => {
            const func = eventsWithSelector[selector][eventName].bind(this)
            el.removeEventListener(eventName, func)
          })
        }
      })
    }
  }

  addAttributes () {
    const { attributes } = this._props

    Object.entries(attributes).forEach((values) => {
      const [key, value] = values as IAttribute
      const input = this._element.querySelector('input')

      if (input && key === 'value' && typeof value === 'string') {
        input.value = value
        return
      }

      if (value === undefined) {
        return
      }
      if (typeof value === 'boolean') {
        if (value) {
          this._element.setAttribute(key, '')
          return
        } else {
          return
        }
      }
      this._element.setAttribute(key, value)
    })
  }

  getContent () {
    return this._element
  }

  makePropsProxy (props: T) {

    return new Proxy(props, {

      get (target, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set (target, prop: string, value) {
        let targetProp = target[prop]
        if (targetProp && targetProp !== value) {
          targetProp = value
        }

        return true
      }

    })
  }

  getChildren (propsAndChildren: IObject) {
    const children: IObject = {}
    const props: IObject = {}

    Object.keys(propsAndChildren).forEach(key => {
      const item = propsAndChildren[key]
      if (item instanceof Component) {
        children[key] = item
        return
      }
      if (Array.isArray(item) && item.every(i => i instanceof Component)) {
        children[key] = item
        return
      }

      props[key] = item
    })

    return { children, props } as unknown as T
  }

  compile (template: string, props: IObject | undefined) {
    if (typeof props === 'undefined') {
      props = this._props
    }

    const propsAndStubs = { ...props }

    Object.entries(this._children).forEach(([key, child]: [string, Component<T>]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((i: Component<T>) => `<div data-id="${i._id}"></div>`)
        return
      }
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    })

    const fragment = this.createDocumentElement('template') as HTMLTemplateElement

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs)

    Object.values(this._children).forEach((child: Component<T>) => {
      if (Array.isArray(child)) {
        child.forEach((i: Component<T>) => {
          const stub = fragment.content.querySelector(`[data-id="${i._id}"]`)
          if (stub != null) {
            stub.replaceWith(i.getContent())
          }
        })
        return
      }
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
      if (stub != null) {
        stub.replaceWith(child.getContent())
      }
    })

    return fragment.content
  }

  _componentDidMount () {
    this.componentDidMount()
    Object.values(this._children).forEach((child) => {
      if (child.constructor === Array) {
        child.forEach(i => {
          i.dispatchComponentDidMount()
        })
        return
      }
      child.dispatchComponentDidMount()
    })
  }

  componentDidMount () {

  }

  dispatchComponentDidMount () {
    this._eventBus.emit(EventsEnum.FLOW_CDM)
    if (Object.keys(this._children).length > 0) {
      this._eventBus.emit(EventsEnum.FLOW_RENDER)
    }
  }

  _componentDidUpdate (oldProps: T, newProps: T) {
    const isReRender = this.componentDidUpdate(oldProps, newProps)
    if (isReRender) {
      this._eventBus.emit(EventsEnum.FLOW_RENDER)
    }
  }

  componentDidUpdate (oldProps: T, newProps: T) {
    console.log('CDU', oldProps, newProps)
    return true
  }

  setProps (newProps: IObject) {
    if (!newProps) {
      return
    }

    const { children, props } = this.getChildren(newProps)

    if (Object.values(children).length > 0) {
      this._children = children
    }
    if (Object.values(props).length > 0) {
      this._props = props
    }
    if (Object.values(children).length) { Object.assign(this._children, children) }

    if (Object.values(props).length) { Object.assign(this._props, props) }
  }

  show () {
    this.getContent().style.display = 'flex'
  }

  hide () {
    this.getContent().style.display = 'none'
  }
}
