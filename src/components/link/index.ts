import {ILinkProps} from "../../interface/link";
import {Component} from "../../component";

const onLinkClick = (e: MouseEvent) => {
    console.log('Link click', e)
}

class Link extends Component<ILinkProps> {

    render(): Node | void {
        return this.compile(`{{name}}`, this._props);
    }

    addEvents() {
        super.addEvents();
        this._element.addEventListener('click', onLinkClick)
    }
    removeEvents() {
        super.removeEvents();
        this._element.removeEventListener('click', onLinkClick)
    }
}

export default (props: ILinkProps) => new Link(
    'a',
    {
        ...props,
        attributes: {
            class: `button ${props.disabled ? 'disabled' : ''}`,
            href: props.href,
            id: props.id
        },
    }
)
