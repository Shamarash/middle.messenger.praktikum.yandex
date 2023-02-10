import { IButtonProps } from '../../interface/button'
import { Component } from '../../component'
import template from './template'

class Button extends Component<IButtonProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }
}

export default (props: IButtonProps) => new Button(
  'button',
  {
    ...props,
    attributes: {
      class: `button ${props.type}`,
      type: props.submit ? 'submit' : 'button',
      disabled: props.disabled
    },
    events: {
      click: function (e: MouseEvent) {
        console.log('Button click', e)
      }
    }

  }
)
