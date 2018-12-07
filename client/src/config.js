const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/';
const RUNNER_URL = process.env.REACT_APP_RUNNER_URL || 'https://chainshot-relayer.herokuapp.com/execute/'
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL || '/';

export {
  API_URL,
  RUNNER_URL,
  PUBLIC_URL,
}
