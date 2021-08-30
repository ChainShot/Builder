const axios = require('axios');
const { GRAPH_API } = require('../config');
const { stageContainerGroupIds } = require("./queries");

async function getStageContainerGroupIds() {
  const r1 = await axios.post(GRAPH_API, {
    query: stageContainerGroupIds,
    variables: { filter: '{ "productionReady": true }' }
  });
  const { data: { data: { stageContainerGroups: idObjects }}} = r1;

  return idObjects.map(x => x.id);
}

module.exports = getStageContainerGroupIds;
