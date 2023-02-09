import { IErrorPageProps } from '../../interface/errorPage'
import { Component } from '../../component'
import template from './template'

class ErrorPage extends Component<IErrorPageProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }
}

export default (props: IErrorPageProps) => new ErrorPage(
  'div',
  {
    ...props,
    attributes: {
      class: 'centeredFlex errorPage',
      text: props.text,
      code: props.code
    }
  }
)
