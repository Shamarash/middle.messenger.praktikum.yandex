import {IButtonProps} from "../../interface/button";
import {Component} from "../../component";
const onButtonClick = (e: any) => {
    console.log('Button click', e)
}
class Button extends Component<IButtonProps> {

    render(): Node | void {
        return this.compile(`{{name}}`, this._props);
    }
    addEvents() {
        super.addEvents();
        this._element.addEventListener('click', onButtonClick)
    }
    removeEvents() {
        super.removeEvents();
        this._element.removeEventListener('click', onButtonClick)
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
    }
)

