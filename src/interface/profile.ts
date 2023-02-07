import {IBaseProps} from "./component";
import {Component} from "../component";
import {IInputProps} from "./input";

export interface IProfile {
    email: string
    login: string
    first_name: string
    second_name: string
    display_name: string
    phone: string
    avatar: string | null
}

export interface IProfileProps extends IBaseProps {
    isEdit: boolean
    inputs: Component<IInputProps>[]
    profile?: IProfile
}
