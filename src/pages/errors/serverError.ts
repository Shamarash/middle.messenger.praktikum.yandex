import errorPage from "../../components/errorPage";

export const serverError = () => {

    return errorPage({code: 500, text: 'Мы уже фиксим'})
}
