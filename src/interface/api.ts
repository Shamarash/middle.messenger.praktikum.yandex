import {HttpMethodEnum} from "../enum/api";

export interface IQueryProps {
    [key: string]: string
}

export interface IQueryOptions<T = undefined> {
    method: HttpMethodEnum,
    data?: T
    headers?: {[key: string] : string}
    queryParams?: {[key: string] : string}
    timeout?: number
    tryCount?: number
}
