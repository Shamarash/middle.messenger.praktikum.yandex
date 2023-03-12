import { ILinkProps } from '../../interface/link'
import { Component } from '../../component'
import template from './template'
import { router } from '../../router'

class Link extends Component<ILinkProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }
}

export default (props: ILinkProps) => new Link(
  'a',
  {
    ...props,
    attributes: {
      class: `${props.disabled ? 'disabled' : ''} ${props.className ?? ''}`,
      href: props.href,
      id: props.id
    },
    events: {
      click: function (e: MouseEvent) {
        e.preventDefault()
        if (props.href) {
          router.go(props.href)
        }
      }
    }
  }
)
