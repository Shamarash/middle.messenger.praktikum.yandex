import { IInputProps } from '../../interface/input'
import { Component } from '../../component'
import template from './template'
import { login } from '../../pages/login'
import store from "../../store";

class Input extends Component<IInputProps> {

  render (): Node | void {
    return this.compile(template, this._props)
  }
}

export default (props: IInputProps) => new Input(
  'div',
  {
    ...props,
    attributes: {
      class: `inputContainer ${props.containerClass ?? ''}`,
      disabled: props.disabled,
      error: props.error,
      required: props.required,
      inputClass: props.class,
      value: props.value,
      errorText: props.errorText
    },
    events: {
      ...props.events,
      blur: function (e: Event) {
        const target = e.target as HTMLInputElement
        const oldProps = this._props as unknown as IInputProps

        this.setProps({
          ...oldProps,
          attributes: {
            ...oldProps.attributes,
            value: target.value,
            error: target.validity.valid
              ? undefined
              : (oldProps?.attributes?.errorText ?? target.validationMessage)
          }
        })
      }
    }
  }
)
