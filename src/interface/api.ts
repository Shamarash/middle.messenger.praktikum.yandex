export interface IQueryProps {
    [key: string]: string
}

export enum HttpMethodEnum  {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE ='DELETE'
}

export interface IQueryOptions<T = undefined> {
    method: HttpMethodEnum,
    data?: T
    headers?: {[key: string] : string}
    queryParams?: {[key: string] : string}
    timeout?: number
    tryCount?: number
}
