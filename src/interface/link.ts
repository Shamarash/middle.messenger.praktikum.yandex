import {IBaseProps} from "./component";

export interface ILinkProps extends IBaseProps {
    name: string
    id: string
    disabled?: boolean
    href?: string
}
