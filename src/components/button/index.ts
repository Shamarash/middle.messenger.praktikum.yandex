import Handlebars from 'handlebars';
import button from './button.hbs';
import {IButtonProps} from "../../interface/button";

Handlebars.registerPartial('button', button);

export default (props: IButtonProps): HTMLElement => {
    return button(props);
}
