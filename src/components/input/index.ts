import { IInputProps } from '../../interface/input'
import { Component } from '../../component'
import template from './template'

class Input extends Component<IInputProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }

  componentDidUpdate (oldProps: IInputProps, newProps: IInputProps): boolean {
    return (oldProps.attributes?.error !== newProps.attributes?.error || oldProps.showError !== newProps.showError)
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
    eventsWithSelector: {
      input: {
        input: function (e: Event) {
          const target = e.target as HTMLInputElement
          const oldProps = this._props as unknown as IInputProps

          this.setProps({
            ...oldProps,
            attributes: {
              ...oldProps.attributes,
              value: target.value,
            }
          })
        },
        blur: function (e: Event) {
          const target = e.target as HTMLInputElement
          const oldProps = this._props as unknown as IInputProps
          this.setProps({
            ...oldProps,
            attributes: {
              showError: true,
              value: target.value,
              error: target.validity.valid
                ? undefined
                : (props.errorText ?? target.validationMessage)

            }
          })
        },
      }

    }
  })
