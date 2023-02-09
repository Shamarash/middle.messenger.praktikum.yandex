import { ILinkProps } from '../../interface/link'
import { Component } from '../../component'
import template from './template'

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
      class: `button ${props.disabled ? 'disabled' : ''}`,
      href: props.href,
      id: props.id
    }
  }
)
