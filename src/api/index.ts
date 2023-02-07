import {HttpMethodEnum, IQueryOptions, IQueryProps} from "../interface/api";

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
                resolve(JSON.parse(xhr.responseText) as K);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;


            if (data) {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }
            setTimeout(reject, timeout)
        });
    };
}
