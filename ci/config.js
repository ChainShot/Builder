require("dotenv").config();

const EXECUTION_RESULTS = {
  NONE: 0,
  SUCCESS: 1,
  FAILED: 2
}

const LANGUAGE_VERSIONS = {
  solidity: ['0.6.12', '0.7.5', '0.8.4'],
  javascript: ['10.x', '10.x/babel']
}

const GRAPH_API = process.env.GRAPH_API || "http://localhost:3040/graphql";

const RUN_URL = process.env.RUN_URL || "https://relayer-staging.chainshot.com/run/";

module.exports = {
  LANGUAGE_VERSIONS,
  EXECUTION_RESULTS,
  GRAPH_API,
  RUN_URL,
}
