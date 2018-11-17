import axios from 'axios';
import {apiUrl} from '../config';

export default axios.create({
    baseURL: apiUrl,
    transformResponse: [(response, headers) => {
        let contentType = headers['content-type'];
        if (contentType && contentType.indexOf('json') >= 0) {
            if(!response) return {};
            const json = JSON.parse(response);
            return (json && json.data) ? json.data : json;
        }
        return response;
    }],
});
