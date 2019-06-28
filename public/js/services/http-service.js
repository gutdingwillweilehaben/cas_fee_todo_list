import {valueStorage} from './value-storage.js'

class HttpService {
    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});


        console.log(url);

        return fetch(url, {
            method: method,
            headers: fetchHeaders,
            body: JSON.stringify(data),
            mode: 'cors',
        }).then(x => {
            return x.json();
        });
    }

    async getTasks(sortBy, sortDirection, filtered) {

        let url = `/tasks?sort=${sortBy}:${sortDirection}`;

        if (filtered === 'true') {
            url += '&filtered=true'
        }

        console.log(url);

        let response = await fetch(url);
        return await response.json()
    }
}



export const httpService = new HttpService();
