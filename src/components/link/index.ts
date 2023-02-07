import {ILinkProps} from "../../interface/link";
import {Component} from "../../component";

class Link extends Component<ILinkProps> {

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

export default (props: ILinkProps) => new Link(
    'a',
    {
        ...props,
        attributes: {
            // class: `button ${props.type}`,
            // type: props.submit ? 'submit' : 'button',
            // disabled: props.disabled
        },
    }
)
