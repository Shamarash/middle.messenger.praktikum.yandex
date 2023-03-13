import { IBaseProps } from './component'

export interface IButtonProps extends IBaseProps {
  attributes: {
    disabled?: boolean
    type: string
    class?: string
  }
  name: string
  submit?: boolean
}
