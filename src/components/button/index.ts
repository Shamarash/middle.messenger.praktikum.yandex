import {IButtonProps} from "../../interface/button";
import {Component} from "../../component";

class Button extends Component<IButtonProps> {

    render(): Node | void {
        return this.compile(`{{name}}`, this._props);
    }
    addEvents() {
        super.addEvents();
        this._element.addEventListener('click', (e) => {
            console.log('click', e)
        })
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

