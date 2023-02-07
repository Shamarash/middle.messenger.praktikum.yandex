import {IErrorPageProps} from "../../interface/errorPage";
import {Component} from "../../component";

class ErrorPage extends Component<IErrorPageProps> {

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

export default (props: IErrorPageProps) => new ErrorPage(
    'div',
    {
        ...props,
        attributes: {
            // class: `button ${props.type}`,
            // type: props.submit ? 'submit' : 'button',
            // disabled: props.disabled
        },
    }
)
