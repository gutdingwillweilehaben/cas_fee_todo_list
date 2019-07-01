class HttpService {
    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});

        return fetch(url, {
            method: method,
            headers: fetchHeaders,
            body: JSON.stringify(data),
            mode: 'cors',
        }).then(x => {
            return x.json();
        });
    }
}

export const httpService = new HttpService();