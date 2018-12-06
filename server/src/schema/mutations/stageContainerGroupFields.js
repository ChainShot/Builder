const { StageContainerGroupType } = require('../models');
const { configWriter } = require('../../utils/ioHelpers');
const { MODEL_DB } = require('../../config');
const { ObjectID } = require('mongodb');
const {
  GraphQLString,
} = require('graphql');

const stageContainerGroupArgs = {
  id: { type: GraphQLString },
  title: { type: GraphQLString },
  description: { type: GraphQLString },
  containerType: { type: GraphQLString },
}

module.exports = {
  createStageContainerGroup: {
    type: StageContainerGroupType,
    args: stageContainerGroupArgs,
    async resolve (_, props) {
      return configWriter(MODEL_DB.STAGE_CONTAINER_GROUPS, {
        id: ObjectID().toString(),
        title: 'Untitled',
        ...props
      });
    }
  }
}
