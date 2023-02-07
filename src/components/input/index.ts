import input from './input.hbs';
import {IInputProps} from "../../interface/input";
import {Component} from "../../component";

class Input extends Component<IInputProps> {

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

export default (props: IInputProps) => new Input(
    'input',
    {
        ...props,
        attributes: {
            // class: `button ${props.type}`,
            // type: props.submit ? 'submit' : 'button',
            // disabled: props.disabled
        },
    }
)
