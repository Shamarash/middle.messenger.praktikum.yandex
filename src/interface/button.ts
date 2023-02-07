import {ButtonTypeEnum} from "../enum/button";
import {IBaseProps} from "./component";

export interface IButtonProps extends IBaseProps {
    name: string
    disabled?: boolean
    submit?: boolean
    type: ButtonTypeEnum

}
