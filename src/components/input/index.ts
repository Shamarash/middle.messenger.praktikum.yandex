import { IInputProps } from '../../interface/input'
import { Component } from '../../component'
import template from './template'

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
      class: 'inputContainer',
      type: props.type,
      disabled: props.disabled,
      id: props.id,
      title: props.title,
      error: props.error,
      required: props.required,
      inputClass: props.class,
      placeholder: props.placeholder,
      pattern: props.pattern,
      value: props.value,
      errorText: props.errorText
    },
    events: {
      input: function (e: Event) {

        console.log('input')
        const target = e.currentTarget as HTMLInputElement
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
