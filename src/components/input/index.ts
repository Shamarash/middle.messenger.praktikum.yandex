import Handlebars from 'handlebars';
import input from './input.hbs';
import {InputTypeEnum} from "../../enum/input";

export interface IInputProps {
	id: string
	title: string
	label?: string
	class?: string
	placeholder?: string
	disabled?: boolean
	type?: InputTypeEnum
}

Handlebars.registerPartial('input', input);

export default (props : IInputProps) => {
	return input(props);
}
