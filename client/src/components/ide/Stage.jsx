import React, { Component } from 'react';
import './Stage.scss';
import CodeFile from './CodeFile';
import Details from './Details';
import Task from './Task';
import Validations from './Validations';
import { withRouter } from 'react-router-dom';
import PropsRoute from '../PropsRoute';

class Stage extends Component {
  render() {
    const { match: { params: { stageId }, url }, stageContainer } = this.props;
    const stage = stageContainer.stages.filter(x => x.id === stageId)[0];
    if(!stage) return null;
    return (
      <React.Fragment>
        <PropsRoute path={`${url}/file/:codeFileId`} component={CodeFile} stage={stage} />
        <PropsRoute path={`${url}/details`} component={Details} stage={stage} />
        <PropsRoute path={`${url}/task`} component={Task} stage={stage} />
        <PropsRoute path={`${url}/validations`} component={Validations} stage={stage} />
      </React.Fragment>
    )
  }
}

export default withRouter(Stage);
