import { IInputProps } from '../../interface/input'
import { Component } from '../../component'
import template from './template'

class Input extends Component<IInputProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }

  onInputChange (e: Event) {
    const target = e.currentTarget as HTMLInputElement
    const error = this._props.attributes.error

    if (target.validity.valid && error) {
      const oldProps = this._props as IInputProps
      this.setProps({
        ...oldProps,
        attributes: {
          ...this._props.attributes,
          error: undefined
        }
      })
    }
  }

  onBlur (e: Event) {
    const target = e.currentTarget as HTMLInputElement

    if (!target.validity.valid) {
      console.log(target.validationMessage)
      const oldProps = this._props as IInputProps
      this.setProps({
        ...oldProps,
        attributes: {
          ...this._props.attributes,
          error: target.validationMessage
        }
      })
    }
  }

  addEvents () {

    const el = this._element.querySelector('input') as HTMLInputElement
    console.log(el)
    if (el) {
      el.addEventListener('change', this.onInputChange.bind(this))
      el.addEventListener('blur', this.onBlur.bind(this))
    }

  }

  removeEvents () {

    const el = this._element.querySelector('input') as HTMLInputElement
    console.log(el)
    if (el) {
      el.removeEventListener('change', this.onInputChange.bind(this))
      el.removeEventListener('blur', this.onBlur.bind(this))
    }
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
      pattern: props.pattern
    },
  }
)
