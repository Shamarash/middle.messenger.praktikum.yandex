import errorPage from "../../components/errorPage";

export const notFound = () => {

    return errorPage({code: 404, text: 'Не туда попали'})
}
