import axios from 'axios';
import {RUNNER_URL, RUNNER_SERVER_KEY} from '../../config';

export default axios.create({
    baseURL: RUNNER_URL,
    transformRequest: [(data, headers) => {
        headers['authorization'] = RUNNER_SERVER_KEY;
        return JSON.stringify(data);
    }],
    // transform request is setting it to form data,
    // seeing similar issues as reported here:
    // https://github.com/axios/axios/issues/860
    headers: {
        'Content-Type': 'application/json'
    },
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
