import React, { Component } from 'react';
import apiQuery from '../../utils/api/query';
import findStage from '../../queries/stage/find';
import { withRouter } from 'react-router-dom';
import QueriesLoader from './QueriesLoader';
import Stage from './Stage';

class StageLoader extends Component {
  render() {
    const { match: { params: { stageId }, url } } = this.props;
    const variables = { id: stageId };
    const queries = [{ query: findStage, prop: 'stage', variables }];
    return (
      <QueriesLoader queries={queries} key={stageId}>
        <Stage basename={url} />
      </QueriesLoader>
    )
  }
}

export default withRouter(StageLoader);
