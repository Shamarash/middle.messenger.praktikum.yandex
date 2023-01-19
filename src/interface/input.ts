import {InputTypeEnum} from "../enum/input";

export interface IInputProps {
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