const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/';
const RUNNER_URL = process.env.REACT_APP_RUNNER_URL || 'https://chainshot-relayer.herokuapp.com/run/';
const SOLC_COMPILER_URL = process.env.REACT_APP_SOLC_COMPILER_URL || 'https://www.chainshot.com/server/solc';
const VPYER_COMPILER_URL = process.env.REACT_APP_VPYER_COMPILER_URL || 'https://vyper-compiler.herokuapp.com/compile/';
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL || '/';
const READ_THE_DOCS = process.env.REACT_APP_READ_THE_DOCS || 'https://chainshotbuilder.readthedocs.io/en/latest';

const STAGE_TYPE_OPTIONS = [
  { label: 'Code Stage', value: 'CodeStage' },
  { label: 'UI Stage', value: 'UIStage' },
  { label: 'Video Stage', value: 'VideoStage' },
]

const STAGE_LANGUAGE_OPTIONS = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Solidity', value: 'solidity' },
  { label: 'Vyper', value: 'vyper' },
]

export {
  API_URL,
  RUNNER_URL,
  VPYER_COMPILER_URL,
  STAGE_TYPE_OPTIONS,
  STAGE_LANGUAGE_OPTIONS,
  SOLC_COMPILER_URL,
  PUBLIC_URL,
  READ_THE_DOCS,
}
