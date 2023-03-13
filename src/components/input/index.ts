import { IInputProps } from '../../interface/input'
import { Component } from '../../component'
import template from './template'

class Input extends Component<IInputProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }

  componentDidUpdate (oldProps: IInputProps, newProps: IInputProps): boolean {
    return (oldProps.error !== newProps.error || oldProps.showError !== newProps.showError)
  }
}

export default (props: IInputProps) => new Input(
  'div',
  {
    ...props,
    attributes: {
      ...props.attributes,
      class: 'inputContainer',
    },
    eventsWithSelector: {
      input: {
        input: function (e: Event) {
          const target = e.target as HTMLInputElement
          const oldProps = this._props as unknown as IInputProps
          this.setProps({
            ...oldProps,
            attributes: {
              ...props.attributes,
              class: 'inputContainer ' + (props.attributes?.class?.toString() ?? ''),
            },
            attributesWithSelector: {
              input: {
                ...oldProps.attributesWithSelector?.input,
                value: target.value,
                error: target.validity.valid
                  ? undefined
                  : (oldProps?.attributes?.errorText ?? target.validationMessage),
                class: 'input ' +
                    (props.attributesWithSelector?.input?.class?.toString() ?? '') +
                    ((!target.validity.valid && props.showError) ? 'inputErrorText' : ''),
              }
            }
          })
        },
        blur: function (e: Event) {
          const target = e.target as HTMLInputElement
          const oldProps = this._props as unknown as IInputProps
          this.setProps({
            ...oldProps,
            showError: true,
            attributes: {
              ...props.attributes,
              class: 'inputContainer ' + (props.attributes?.class?.toString() ?? ''),
            },
            error: target.validity.valid
              ? undefined
              : (props.errorText ?? target.validationMessage),
            attributesWithSelector: {
              input: {
                ...oldProps.attributesWithSelector?.input,
                class: 'input ' +
                    (props.attributesWithSelector?.input?.class?.toString() ?? '') +
                    (!target.validity.valid ? 'inputErrorText' : ''),
                value: target.value,

              }
            }
          })
        },
      }

    }
  })
