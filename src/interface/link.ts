import {IBaseProps} from "./component";

export interface ILinkProps extends IBaseProps {
    name: string
    disabled?: boolean
    href?: string
}
