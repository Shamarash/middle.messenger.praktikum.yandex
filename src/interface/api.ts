import { HttpMethodEnum } from '../enum/api'

export type IQueryProps = Record<string, string>

export interface IQueryOptions<T = undefined> {
  method?: HttpMethodEnum
  data?: T
  headers?: Record<string, string>
  queryParams?: Record<string, string>
  timeout?: number
  tryCount?: number
}

export interface IErrorResult {
  reason: string
}
