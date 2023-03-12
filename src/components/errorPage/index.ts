import { IErrorPageProps } from '../../interface/errorPage'
import { Component } from '../../component'
import template from './template'
import link from '../link'

class ErrorPage extends Component<IErrorPageProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }
}

export default (props: IErrorPageProps) => new ErrorPage(
  'div',
  {
    ...props,
    goBackLink: link({
      name: 'Назад к чатам',
      href: '/chats'
    }),
    attributes: {
      class: 'centeredFlex errorPage',
      text: props.text,
      code: props.code
    }
  }
)
