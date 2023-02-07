import {InputTypeEnum} from "../enum/input";
import {IBaseProps} from "./component";

export interface IInputProps extends IBaseProps {
    id: string
    title: string
    class?: string
    placeholder?: string
    error?: string
    disabled?: boolean
    required?: boolean
    type?: InputTypeEnum
    value?: string

    onChange?(value: string): void
}
