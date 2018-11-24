import React, { Component } from 'react';
import './Stage.scss';
import apiQuery from '../../utils/apiQuery';
import findStage from '../../queries/stage/find';
import StageSidebar from './StageSidebar';
import { Route } from 'react-router-dom';

class Stage extends Component {
  render() {
    const { stage, basename } = this.props;
    if(!stage) return null;
    return (
      <div className="stage">
        <StageSidebar stage={stage} basename={basename}></StageSidebar>
        // <Route path="/content/:containerId/:stageId" component={Stage} />
      </div>
    )
  }
}

export default Stage;
