import React, { Component } from 'react';
import findStage from '../../queries/stage/find';
import { withRouter } from 'react-router-dom';
import Subscriber from './Subscriber';
import Stage from './Stage';

class StageLoader extends Component {
  render() {
    const { match: { params: { stageId }, url } } = this.props;
    return (
      <Subscriber query={findStage} modelType="stage" id={stageId} key={stageId}>
        <Stage basename={url} />
      </Subscriber>
    )
  }
}

export default withRouter(StageLoader);
