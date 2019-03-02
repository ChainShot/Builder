import axios from 'axios';
import {VPYER_COMPILER_URL, SOLC_COMPILER_URL} from '../../config';

const solcApi = axios.create({
  baseURL: SOLC_COMPILER_URL,
  transformResponse: [(response, headers) => {
      const contentType = headers['content-type'];
      if (contentType && contentType.indexOf('json') >= 0) {
          if(!response) return {};
          const json = JSON.parse(response);
          return (json && json.data) ? json.data : json;
      }
      return response;
  }]
});

const vyperApi = axios.create({
    baseURL: VPYER_COMPILER_URL
})

const isError = error => error.severity === 'error';
const filterWarnings = list => list.filter(x => !isError(x));
const filterErrors = list => list.filter(x => isError(x));

const solc = {
  compile: (sources, languageVersion) => {
    return solcApi.post('', {sources, languageVersion}).then(({data}) => {
        return {
            ...data,
            errors: filterErrors(data.errors),
            warnings: filterWarnings(data.errors),
        }
    });
  }
}


const vyper = {
  compile: (code) => {
    let fd = new FormData();
    fd.set('source', code);
    return vyperApi.post('', fd).then(({data: { result: { abi_code, abi }}}) => {
        if(abi_code === 200) return { abi, errors: [] }
        return { errors: [abi] }
    });
  }
}

export {
  solc,
  vyper
}
