const API_URL = process.env.REACT_APP_API_URL || `http://localhost:${window.location.port}/`;
const RUNNER_URL = process.env.REACT_APP_RUNNER_URL || 'https://chainshot-relayer.herokuapp.com/run/';
const SOLC_COMPILER_URL = process.env.REACT_APP_SOLC_COMPILER_URL || 'https://chainshot-relayer.herokuapp.com/solc/';
const VPYER_COMPILER_URL = process.env.REACT_APP_VPYER_COMPILER_URL || 'https://vyper-compiler.herokuapp.com/compile/';
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL || '/';
const READ_THE_DOCS = process.env.REACT_APP_READ_THE_DOCS || 'https://chainshotbuilder.readthedocs.io/en/latest';
const SLACK_INVITE = process.env.REACT_APP_SLACK_INVITE || 'https://join.slack.com/t/chainshotnodes/shared_invite/enQtMzU3ODc5NTM3MTI3LTFlZTY1YzcwM2QzYWI0ODY2ZDczMmYzOTVlYWQwZjkyZDFlYzUxZWM4NDNlNjk3N2EyNGMwOGQ0ZTVkZjQyNjE';

const STAGE_TYPE_OPTIONS = [
  { label: 'Code Stage', value: 'CodeStage' },
  { label: 'Download Stage', value: 'DownloadStage' },
  { label: 'IFrame Stage', value: 'IFrameStage' },
  { label: 'Video Stage', value: 'VideoStage' },
]

const STAGE_LANGUAGE_OPTIONS = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Solidity', value: 'solidity' },
  { label: 'Vyper', value: 'vyper' },
]

const IDE_TAB_TYPES = {
  STAGE_CONTAINER_INTRO: 0,
  BADGE_CONFIG: 1,
  STAGE_CONFIG: 2,
  STAGE_TASK: 3,
  STAGE_DETAILS: 4,
  CODE_FILE_CONFIG: 5,
  CODE_FILE_INITIAL_CODE: 6,
  CODE_FILE_SOLUTION: 7,
  SKELETON_CONFIG: 8,
}

export {
  API_URL,
  RUNNER_URL,
  SLACK_INVITE,
  VPYER_COMPILER_URL,
  STAGE_TYPE_OPTIONS,
  STAGE_LANGUAGE_OPTIONS,
  SOLC_COMPILER_URL,
  PUBLIC_URL,
  READ_THE_DOCS,
  IDE_TAB_TYPES,
}
