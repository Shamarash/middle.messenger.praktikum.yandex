import { IBaseProps } from './component'

export interface IInputProps extends IBaseProps {
  minLength?: number
  maxLength?: number
  errorText?: string
  placeholderLabel?: string
  showError?: boolean
  error?: string
  class?: string
}
