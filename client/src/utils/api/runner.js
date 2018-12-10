import axios from 'axios';
import {RUNNER_URL} from '../../config';

export default axios.create({
    baseURL: RUNNER_URL,
    transformResponse: [(response, headers) => {
        const contentType = headers['content-type'];
        if (contentType && contentType.indexOf('json') >= 0) {
            if(!response) return {};
            const json = JSON.parse(response);
            return (json && json.data) ? json.data : json;
        }
        return response;
    }],
});
