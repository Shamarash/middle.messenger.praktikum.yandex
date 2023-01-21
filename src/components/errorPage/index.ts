import Handlebars from 'handlebars';
import errorPage from './errorPage.hbs';
import {IErrorPageProps} from "../../interface/errorPage";

Handlebars.registerPartial('errorPage', errorPage);

export default (props: IErrorPageProps): HTMLElement => {
    return errorPage(props);
}
