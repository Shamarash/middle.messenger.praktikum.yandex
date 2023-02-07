import {IBaseProps} from "./component";
import {Component} from "../component";
import {IInputProps} from "./input";
import {IButtonProps} from "./button";
import {ILinkProps} from "./link";

export interface ILoginProps extends IBaseProps {
    title: string
    inputs: Component<IInputProps>[]
    submitBtn: Component<IButtonProps>
    linkToRegister: Component<ILinkProps>
}
