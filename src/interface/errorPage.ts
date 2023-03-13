import { IBaseProps } from './component'
import { Component } from '../component'
import { ILinkProps } from './link'

export interface IErrorPageProps extends IBaseProps {
  code?: number
  text?: string
  goBackLink: Component<ILinkProps>
}
