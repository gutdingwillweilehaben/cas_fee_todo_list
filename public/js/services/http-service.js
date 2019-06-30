import {valueStorage} from './value-storage.js'

class HttpService {
    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});

        //console.log(data);
        //console.log(`url : ${url}`);

        return fetch(url, {
            method: method,
            headers: fetchHeaders,
            body: JSON.stringify(data),
            mode: 'cors',
        }).then(x => {

            console.log(`Data: ${JSON.stringify(data)}`);


            return x.json();
        });
    }
}

export const httpService = new HttpService();