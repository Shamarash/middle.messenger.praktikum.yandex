import { IQueryOptions, IQueryProps } from '../interface/api'
import { HttpMethodEnum } from '../enum/api'

const queryStringify = (data: IQueryProps): string => {
  return Object.entries(data).map((items, index) => {
    return `${index === 0 ? '?' : ''}${items[0]}=${items[1]}`
  }).join('&')
}

const IsJson = (value: string) => {
  try {
    JSON.parse(value)
  } catch (e) {
    return false
  }
  return true
}

export class HttpRequest {
  // T = request data, K = expected result from promise
  public async get<K, T = undefined>(url: string, options?: IQueryOptions<T>): Promise<{ data?: K, code: number }> {
    return await this._request(url,
      {
        ...options,
        method: HttpMethodEnum.GET,
        headers: {}
      })
  };

  public async post<K, T = undefined>(url: string, options?: IQueryOptions<T>): Promise<{ data?: K, code: number }> {
    return await this._request(url,
      { ...options, method: HttpMethodEnum.POST })
  };

  public async delete<K, T = undefined>(url: string, options?: IQueryOptions<T>): Promise<{ data?: K, code: number }> {
    return await this._request(url,
      { ...options, method: HttpMethodEnum.DELETE })
  };

  public async put<K, T = undefined>(url: string, options?: IQueryOptions<T>): Promise<{ data?: K, code: number }> {
    return await this._request(url,
      { ...options, method: HttpMethodEnum.PUT })
  };

  private async _request<T, K>(url: string, {
    method,
    headers,
    data,
    timeout = 5000,
    queryParams
  }: IQueryOptions<T>): Promise<{ data?: K, code: number }> {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const newUrl = (queryParams != null) ? url + queryStringify(queryParams) : url
      if (method) {
        xhr.open(method, newUrl)
      }
      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('content-type', 'application/json')
      }

      if (headers != null) {
        Object.entries(headers).forEach(entries => {
          xhr.setRequestHeader(entries[0], entries[1])
        })
      }
      xhr.onload = () => {
        if (IsJson(xhr.responseText)) {
          resolve({ data: JSON.parse(xhr.responseText) as K, code: xhr.status })
          return
        }
        resolve({ code: xhr.status })
      }
      xhr.withCredentials = true
      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (data) {
        if (data instanceof FormData) {
          xhr.send(data)
          return
        }
        xhr.send(JSON.stringify(data))
      } else {
        xhr.send()
      }
      setTimeout(reject, timeout)
    })
  };
}

const request = new HttpRequest()

export default request

export const baseUrl = 'https://ya-praktikum.tech/api/v2'
