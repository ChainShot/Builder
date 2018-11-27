import React, { Component } from 'react';
import './Stage.scss';
import apiQuery from '../../utils/api/query';
import findStage from '../../queries/stage/find';
import CodeFileLoader from './CodeFileLoader';
import Details from './Details';
import Task from './Task';
import Validations from './Validations';
import { Route } from 'react-router-dom';

class Stage extends Component {
  render() {
    const { stage, basename } = this.props;
    if(!stage) return null;
    return (
      <div className="stage">
        <Route path={`${basename}/file/:codeFileId`} component={CodeFileLoader} />
        <Route path={`${basename}/details`} component={() => <Details stage={stage}/>} />
        <Route path={`${basename}/task`} component={() => <Task stage={stage}/>} />
        <Route path={`${basename}/validations`} component={() => <Validations stage={stage}/>} />
      </div>
    )
  }
}

export default Stage;
