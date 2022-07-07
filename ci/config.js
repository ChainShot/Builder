require("dotenv").config();

const EXECUTION_RESULTS = {
  NONE: 0,
  SUCCESS: 1,
  FAILED: 2
}

const LANGUAGE_VERSIONS = {
  solidity: ['0.6.12', '0.7.5', '0.8.4'],
  javascript: ['10.x', '10.x/babel', '8.x/babel', '6.x/babel']
}

const BUILDER_PORT = process.env.BUILDER_PORT || 3040;

const GRAPH_API = process.env.GRAPH_API || `http://localhost:${BUILDER_PORT}/graphql`;

const RUN_URL = process.env.RUN_URL || "https://relayer-staging.chainshot.com/run/";

module.exports = {
  LANGUAGE_VERSIONS,
  EXECUTION_RESULTS,
  BUILDER_PORT,
  GRAPH_API,
  RUN_URL,
}
