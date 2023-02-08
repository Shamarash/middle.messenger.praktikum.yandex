import {IInputProps} from "../../interface/input";
import {Component} from "../../component";

const input = `<input id="{{id}}"
           name="{{id}}"
           placeholder=" "
           type="{{type}}"
           title="{{title}}"
           value="{{value}}"
        {{#if error}}
           class="inputErrorText"
        {{/if}}
        {{#if disabled}}
           disabled
        {{/if}}
        {{#if required}}
           required
        {{/if}}
           value=""
           class="input {{inputClass}}"/>
    <label for="{{id}}">
        {{placeholder}}
    </label>
    {{#if error}}
        <span class="inputError">
            {{error}}
        </span>
    {{/if}}`

class Input extends Component<IInputProps> {

    render(): Node | void {
        return this.compile(input, this._props);
    }

    addEvents() {
        super.addEvents();
        this._element.addEventListener('click', (e) => {
            console.log('click', e)
        })
    }
}

export default (props: IInputProps) => new Input(
    'div',
    {
        ...props,
        attributes: {
            class: `inputContainer`,
            type: props.type,
            disabled: props.disabled,
            id: props.id,
            title: props.title,
            error: props.error,
            required: props.required,
            inputClass: props.class,
            placeholder: props.placeholder,
        },
    }
)
