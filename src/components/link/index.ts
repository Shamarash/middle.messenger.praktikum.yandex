import Handlebars from 'handlebars';
import link from './link.hbs';
import {ILinkProps} from "../../interface/link";

Handlebars.registerPartial('link', link);

export default (props: ILinkProps) => {
    return link(props);
}

