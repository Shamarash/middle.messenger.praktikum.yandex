import Handlebars from 'handlebars';
import button from './button.hbs';
import {ButtonTypeEnum} from "../../enum/button";

export interface IButtonProps {
	name: string
	disabled?: boolean
	submit?: boolean
	type: ButtonTypeEnum
}

Handlebars.registerPartial('button', button);

export default (props : IButtonProps): HTMLElement => {
	return button(props);
}
