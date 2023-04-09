import { IInputProps } from '../../interface/input'
import Component from '../../component'
import template from './template'

class Input extends Component<IInputProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }

  componentDidUpdate (oldProps: IInputProps, newProps: IInputProps): boolean {
    return (oldProps.error !== newProps.error || oldProps.showError !== newProps.showError)
  }
}

export default (props: IInputProps, onChange?: (value: string) => void) => new Input(
  'div',
  {
    ...props,
    attributes: {
      ...props.attributes,
      class: 'inputContainer ' + (props.attributes?.class?.toString() ?? ''),
    },
    eventsWithSelector: {
      input: {
        input: function (e: Event) {
          const target = e.target as HTMLInputElement
          const oldProps = this._props as unknown as IInputProps
          // @ts-expect-error
          const input = this._element.querySelector('input') as HTMLInputElement
          if (input) {
            input.setAttribute('value', target.value)
            if (onChange) {
              onChange(target.value)
            }
          }
          this.setProps({
            ...oldProps,
            attributes: {
              ...props.attributes,
              class: 'inputContainer ' + (props.attributes?.class?.toString() ?? ''),
            },
            attributesWithSelector: {
              input: {
                ...oldProps.attributesWithSelector?.input,
                error: target.validity.valid
                  ? undefined
                  : (oldProps?.attributes?.errorText ?? target.validationMessage),
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                class: `input ${props.attributesWithSelector?.input?.class?.toString() ?? ''}
                    ${(!target.validity.valid && !!props.showError) ? 'inputErrorText' : ''}`,
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
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                class: `input ${props.attributesWithSelector?.input?.class?.toString() ?? ''}
                    ${(!target.validity.valid && !!props.showError) ? 'inputErrorText' : ''}`,
                value: target.value,

              }
            }
          })
        },
      }

    }
  })
