import Handlebars from 'handlebars';
import link from './link.hbs';

export interface ILinkProps {
	name: string
	disabled?: boolean
	href?: string
}

Handlebars.registerPartial('link', link);

export default (props : ILinkProps) => {
	return link(props);
}

