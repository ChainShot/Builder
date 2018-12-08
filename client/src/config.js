const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/';
const RUNNER_URL = process.env.REACT_APP_RUNNER_URL || 'https://chainshot-relayer.herokuapp.com/execute/';
const SOLC_COMPILER_URL = process.env.REACT_APP_SOLC_COMPILER_URL || 'https://www.chainshot.com/server/solc';
const VPYER_COMPILER_URL = process.env.REACT_APP_VPYER_COMPILER_URL || 'https://vyper-compiler.herokuapp.com/compile/';
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL || '/';

export {
  API_URL,
  RUNNER_URL,
  VPYER_COMPILER_URL,
  SOLC_COMPILER_URL,
  PUBLIC_URL,
}
