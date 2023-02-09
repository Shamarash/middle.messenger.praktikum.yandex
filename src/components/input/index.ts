import { IInputProps } from '../../interface/input'
import { Component } from '../../component'
import template from './template'

class Input extends Component<IInputProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }

  onBlur (e: Event) {
    const target = e.currentTarget as HTMLInputElement
    const oldProps = this._props as IInputProps

    this.setProps({
      ...oldProps,
      attributes: {
        ...this._props.attributes,
        value: target.value,
        error: target.validity.valid
          ? undefined
          : (this._props.attributes.errorText || target.validationMessage)
      }
    })
  }

  addEvents () {
    this._element.querySelectorAll('input').forEach(i => {
      i.addEventListener('blur', this.onBlur.bind(this))
    })
  }

  removeEvents () {
    this._element.querySelectorAll('input').forEach(i => {
      i.removeEventListener('blur', this.onBlur.bind(this))
    })
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
    }
  }
)
