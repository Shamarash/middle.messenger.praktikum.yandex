import { InputTypeEnum } from '../enum/input'
import { IBaseProps } from './component'

export interface IInputProps extends IBaseProps {
  id: string
  title: string
  class?: string
  placeholder?: string
  error?: string
  errorText?: string
  disabled?: boolean
  required?: boolean
  type?: InputTypeEnum
  value?: string
  pattern?: string
  minLength?: number
  maxLength?: number

  onChange?: (value: string) => void
}
