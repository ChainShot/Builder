import React, { Component } from 'react';
import './Stage.scss';
import './configuration/Config.scss';
import CodeFile from './codeFile/CodeFile';
import Details from './markdown/Details';
import Task from './markdown/Task';
import Completion from './markdown/Completion';
import Validations from './Validations';
import { withRouter } from 'react-router-dom';
import PropsRoute from '../PropsRoute';
import StageConfig from './configuration/StageConfig';
import SkeletonConfig from './configuration/SkeletonConfig';
import UpdateWrapper from '../UpdateWrapper';

class Stage extends Component {
  render() {
    const { match: { params: { stageId }, url }, stageContainer } = this.props;
    const stage = stageContainer.stages.filter(x => x.id === stageId)[0];
    if(!stage) return null;
    return (
      <React.Fragment>
        <PropsRoute path={`${url}/`} exact key={stageId} component={UpdateWrapper} child={StageConfig} stage={stage} />
        <PropsRoute path={`${url}/file/:codeFileId`} component={CodeFile} stage={stage} />
        <PropsRoute path={`${url}/skeleton/:skeletonId`} component={UpdateWrapper} child={SkeletonConfig} stage={stage} />
        <PropsRoute path={`${url}/details`} component={Details} stage={stage} />
        <PropsRoute path={`${url}/task`} component={Task} stage={stage} />
        <PropsRoute path={`${url}/completion`} component={Completion} stage={stage} />
        <PropsRoute path={`${url}/validations`} component={UpdateWrapper} child={Validations} stage={stage} />
      </React.Fragment>
    )
  }
}

export default withRouter(Stage);
