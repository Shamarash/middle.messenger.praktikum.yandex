import {IErrorPageProps} from "../../interface/errorPage";
import {Component} from "../../component";
const errorPage = ` <h1>{{code}}</h1>
    <p>
        {{#if text}}
            {{text}}
        {{else}}
            Мы уже фиксим
        {{/if}}
    </p>
    <a href="/#chats">Назад к чатам</a>`
class ErrorPage extends Component<IErrorPageProps> {

    render(): Node | void {
        return this.compile(errorPage, this._props);
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
            class: `centeredFlex errorPage`,
            text: props.text,
            code: props.code
        },
    }
)
