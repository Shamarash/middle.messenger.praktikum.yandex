import {HttpMethodEnum, IQueryOptions, IQueryProps} from "../interface/api";

enum METHOD  {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE ='DELETE'
}

const queryStringify = (data: IQueryProps): string => {
    return Object.entries(data).map((items, index) => {
        return `${index === 0 ? '?':''}${items[0]}=${items[1]}`
    }).join('&')
}

class HTTPTransport {
    // T = request data, K = expected result from promise
    public get<K ,T = undefined>(url: string, options?: IQueryOptions<T>) : Promise<K> {
        return this._request(url, {...options, method: HttpMethodEnum.GET});
    };
    public post<K ,T = undefined>(url: string, options?: IQueryOptions<T>) : Promise<K> {
        return this._request(url, {...options, method: HttpMethodEnum.POST});
    };
    public delete<K ,T = undefined>(url: string, options?: IQueryOptions<T>) : Promise<K> {
        return this._request(url, {...options, method: HttpMethodEnum.DELETE});
    };
    public put<K ,T = undefined>(url: string, options?: IQueryOptions<T>) : Promise<K> {
        return this._request(url, {...options, method: HttpMethodEnum.PUT});
    };

    private _request<T, K>(url: string, {method, headers, data, timeout = 5000, tryCount, queryParams}: IQueryOptions<T>): Promise<K> {

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (headers) {
                Object.entries(headers).forEach(entries => {
                    xhr.setRequestHeader(entries[0], entries[1]);
                })
            }
            const newUrl = queryParams ? url + queryStringify(queryParams) : url

            xhr.open(method, newUrl);

            xhr.onload = (result) => {
                resolve(result);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;


            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
            setTimeout(reject, timeout)
        });
    };
}

console.log(
    new HTTPTransport().get<string>('https://practicum.yandex.ru')
)
