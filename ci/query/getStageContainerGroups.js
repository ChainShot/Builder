const axios = require('axios');
const { GRAPH_API } = require('../config');
const { stageContainerGroupsByIds } = require("./queries");

async function getStageContainerGroups(ids) {
  const variables = { containsId: ids };
  const r2 = await axios.post(GRAPH_API, { query: stageContainerGroupsByIds, variables });
  const { data: { data: { stageContainerGroups }}} = r2;
  return stageContainerGroups;
}

module.exports = getStageContainerGroups;
