import {EventBus} from "./eventBus";
import {v4 as uuidv4} from 'uuid';
import Handlebars from 'handlebars';

enum EventsEnum {
    INIT = "init",
    FLOW_CDM = "flow:component-did-mount",
    FLOW_CDU = "flow:component-did-update",
    FLOW_RENDER = "flow:render"
}

interface IMeta<T> {
    tagName: string
    props: T
}

type IAttribute = [string, boolean | string | undefined]

interface IObject {
    [key: string]: any
}

export class Component<T extends IObject> {

    _element: HTMLElement = document.createElement('div')
    _meta: IMeta<T>
    _props: IObject
    _eventBus: EventBus
    _children: IObject
    _setUpdate = false
    _id: string

    constructor(tagName = "div", propsAndChilds: T) {
        const {children, props} = this.getChildren(propsAndChilds)
        this._eventBus = new EventBus();
        this._id = uuidv4()
        this._meta = {
            tagName,
            props
        };
        this._children = this.makePropsProxy(children);
        this._props = this.makePropsProxy({...props, __id: this._id});
        this._registerEvents();
        this._eventBus.emit(EventsEnum.INIT);
    }

    _registerEvents() {
        this._eventBus.on(EventsEnum.INIT, this.init.bind(this));
        this._eventBus.on(EventsEnum.FLOW_CDM, this._componentDidMount.bind(this));
        this._eventBus.on(EventsEnum.FLOW_RENDER, this._render.bind(this));
        this._eventBus.on(EventsEnum.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    createDocumentElement(tag: string) {
        const el = document.createElement(tag)
        if (this._props.settings?.withId) {
            el.setAttribute('data-id', this._id)
        }
        return el
    }

    init() {
        this._element = this.createDocumentElement(this._meta?.tagName);
        this._eventBus.emit(EventsEnum.FLOW_RENDER)
    }

    _render() {
        const block = this.render();
        this.removeEvents()
        this._element.innerHTML = ''

        if (block) {
            this._element.appendChild(block)
        }

        this.addEvents()
        this.addAttributes()
    }

    render(): Node | void {}

    addEvents() {
        const {events = {}} = this._props
        Object.keys(events).forEach(eventName => {
            this._element.addEventListener(eventName, events[eventName])
        })
    }

    removeEvents() {
        const {events = {}} = this._props
        Object.keys(events).forEach(eventName => {
            this._element.removeEventListener(eventName, events[eventName])
        })
    }

    addAttributes() {
        const {attributes} = this._props

        Object.entries(attributes).forEach((values ) => {
            const [key, value] = values as IAttribute

            if (value === undefined || value === false) {
                return
            }
            if (value === true) {
                this._element.setAttribute(key, '')
                return;
            }
            this._element.setAttribute(key, value)
        })
    }

    getContent() {
        return this._element;
    }

    makePropsProxy(props: T) {
        const component = this
        return new Proxy(props, {

            get(target, prop: string) {
                const value = target[prop]
                return typeof value === 'function' ? value.bind(target) : value
            },
            set(target, prop: string, value) {
                let targetProp = target[prop]
                if (targetProp && targetProp !== value) {
                    targetProp = value
                    component._setUpdate = true
                }

                return true;
            },

        })
    }

    getChildren(propsAndChildren: T) {

        const children: IObject = {}
        const props: IObject = {}

        Object.keys(propsAndChildren).forEach(key => {
            const item = propsAndChildren[key]
            if (item instanceof Component) {
                children[key] = item
                return
            }
            if (Array.isArray(item)) {
                children[key] = item
                return
            }

            props[key] = item

        })

        return {children, props} as unknown as T
    }

    compile(template :string, props: IObject | undefined) {
        if (typeof props === 'undefined') {
            props = this._props
        }

        const propsAndStubs = {...props}

        Object.entries(this._children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                propsAndStubs[key] = child.map(i => `<div data-id="${i._id}"></div>`)
                return
            }
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`
        })

        const fragment = this.createDocumentElement('template') as HTMLTemplateElement

        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs)

        Object.values(this._children).forEach(child => {
            if (Array.isArray(child)) {
                child.forEach(i => {
                    const stub = fragment.content.querySelector(`[data-id="${i._id}"]`)
                    if (stub) {
                        stub.replaceWith(i.getContent())
                    }
                })
                return
            }
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
            if (stub) {
                stub.replaceWith(child.getContent())
            }
        })

        return fragment.content
    }

    _componentDidMount() {
        this.componentDidMount()
        Object.values(this._children).forEach((child) => {
            child.dispatchComponentDidMount()
        })
    }

    componentDidMount() {

    }

    dispatchComponentDidMount() {
        this._eventBus.emit(EventsEnum.FLOW_CDM)
        if (Object.keys(this._children).length) {
            this._eventBus.emit(EventsEnum.FLOW_RENDER)
        }
    }

    _componentDidUpdate(oldProps: T, newProps: T) {
        const isReRender = this.componentDidUpdate(oldProps, newProps)
        if (isReRender) {
            this._eventBus.emit(EventsEnum.FLOW_RENDER)
        }
    }

    componentDidUpdate(oldProps: T, newProps: T) {

        return true
    }

    setProps(newProps: T) {
        if (!newProps) {
            return
        }

        this._setUpdate = false
        const oldValue = {...this._props}
        const {children, props} = this.getChildren(newProps)

        if (Object.values(children).length) {
            Object.assign(this._children, children)
        }
        if (Object.values(props).length) {
            Object.assign(this._props, props)
        }

        if (this._setUpdate) {
            this._eventBus.emit(EventsEnum.FLOW_CDU, oldValue, this._props)
            this._setUpdate = false
        }

    }
}
