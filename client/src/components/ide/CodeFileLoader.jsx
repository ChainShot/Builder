import React, { Component } from 'react';
import apiQuery from '../../utils/api/query';
import findCodeFile from '../../queries/codeFile/find';
import { withRouter } from 'react-router-dom';
import Subscriber from './Subscriber';
import CodeFile from './CodeFile';

class CodeFileLoader extends Component {
  render() {
    const { match: { params: { codeFileId }, url } } = this.props;
    return (
      <Subscriber query={findCodeFile} modelType="codeFile" id={codeFileId} key={codeFileId}>
        <CodeFile basename={url} />
      </Subscriber>
    )
  }
}

export default withRouter(CodeFileLoader);
