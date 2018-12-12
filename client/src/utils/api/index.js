import axios from 'axios';
import {API_URL} from '../../config';

export default axios.create({
    baseURL: API_URL,
    transformResponse: [(response, headers) => {
        const contentType = headers['content-type'];
        if (contentType && contentType.indexOf('json') >= 0) {
            if(!response) return {};
            return JSON.parse(response);
        }
        return response;
    }],
});
