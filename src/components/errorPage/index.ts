import { IErrorPageProps } from '../../interface/errorPage'
import { Component } from '../../component'
import template from './template'
import link from '../link'

export default class ErrorPage extends Component<IErrorPageProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }
}

export const errorPageProps: IErrorPageProps = {
  goBackLink: link({
    name: 'Назад к чатам',
    href: '/messenger'
  }),
  attributes: {
    class: 'centeredFlex errorPage',
  }
}
