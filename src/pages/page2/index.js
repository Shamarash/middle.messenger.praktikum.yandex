import Handlebars from 'handlebars';
//import Handlebars from 'handlebars/dist/handlebars.runtime';
import tpl from './tpl.hbs';
import './style.css';
//import button from '../../components/button';

Handlebars.registerPartial('page2', tpl);

export default (props = {}) => {
	return tpl(props);
}
