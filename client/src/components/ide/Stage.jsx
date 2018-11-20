import React, { Component } from 'react';
import './Stage.scss';
import apiQuery from '../../utils/apiQuery';
import findStage from '../../queries/stage/find';
import StageSidebar from './StageSidebar';
import { Route } from 'react-router-dom';

class Stage extends Component {
  state = {
    stage: null
  }
  componentDidMount() {
    const { stageId } = this.props.match.params;
    apiQuery(findStage, { id: stageId }).then(({ stage }) => {
      this.setState({ stage });
    });
  }
  render() {
    const { stage } = this.state;
    if(!stage) return null;
    return (
      <div className="stage">
        <StageSidebar stage={stage}></StageSidebar>
        <Route path="/blocks/:gId/:cId/stage/:sId/file/:cId" component={Stage} />
      </div>
    )
  }
}

export default Stage;
