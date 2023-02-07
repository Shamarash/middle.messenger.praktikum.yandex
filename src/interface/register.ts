import {IBaseProps} from "./component";
import {Component} from "../component";
import {IInputProps} from "./input";
import {IButtonProps} from "./button";
import {ILinkProps} from "./link";

export interface IRegisterProps extends IBaseProps {
    title: string
    inputs: Component<IInputProps>[]
    submitBtn: Component<IButtonProps>
    linkToLogin: Component<ILinkProps>
}
