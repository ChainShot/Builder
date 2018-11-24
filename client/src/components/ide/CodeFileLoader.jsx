import React, { Component } from 'react';
import apiQuery from '../../utils/apiQuery';
import findCodeFile from '../../queries/codeFile/find';
import { withRouter } from 'react-router-dom';
import QueriesLoader from './QueriesLoader';
import CodeFile from './CodeFile';

class CodeFileLoader extends Component {
  render() {
    const { match: { params: { codeFileId }, url } } = this.props;
    const variables = { id: codeFileId };
    const queries = [{ query: findCodeFile, prop: 'codeFile', variables }];
    return (
      <QueriesLoader queries={queries} key={codeFileId}>
        <CodeFile basename={url} />
      </QueriesLoader>
    )
  }
}

export default withRouter(CodeFileLoader);
