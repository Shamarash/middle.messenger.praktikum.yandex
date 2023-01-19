import {ButtonTypeEnum} from "../enum/button";

export interface IButtonProps {
    name: string
    disabled?: boolean
    submit?: boolean
    type: ButtonTypeEnum
}
