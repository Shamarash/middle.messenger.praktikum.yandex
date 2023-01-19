import Handlebars from 'handlebars';
import input from './input.hbs';
import {IInputProps} from "../../interface/input";

Handlebars.registerPartial('input', input);

export default (props: IInputProps) => {
    return input(props);
}
