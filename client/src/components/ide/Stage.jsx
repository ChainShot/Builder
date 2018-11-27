import React, { Component } from 'react';
import './Stage.scss';
import apiQuery from '../../utils/api/query';
import findStage from '../../queries/stage/find';
import CodeFileLoader from './CodeFileLoader';
import { Route } from 'react-router-dom';

class Stage extends Component {
  render() {
    const { stage, basename } = this.props;
    if(!stage) return null;
    return (
      <div className="stage">
        <Route path={`${basename}/file/:codeFileId`} component={CodeFileLoader} />
      </div>
    )
  }
}

export default Stage;
