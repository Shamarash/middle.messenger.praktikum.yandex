import { IBaseProps } from './component'

export interface IErrorPageProps extends IBaseProps {
  code: number
  text?: string
}
