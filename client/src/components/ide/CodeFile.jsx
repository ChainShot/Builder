import React, { Component } from 'react';
import './CodeFile.scss';

class CodeFile extends Component {
  render() {
    const { codeFile: { initialCode } } = this.props;
    return (
      <div className="code-file">
        { initialCode }
      </div>
    )
  }
}

export default CodeFile;
