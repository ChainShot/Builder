import React, { Component } from 'react';
import CodeFileNav from './CodeFileNav';
import CodeFilesNavActions from './CodeFilesNavActions';
import CodeFileDirectory from './CodeFileDirectory';
import SVG from 'components/SVG';

class CodeFilesNav extends Component {
  render() {
    const { codeFiles } = this.props;
    return (
      <React.Fragment>
        <CodeFileDirectory codeFiles={codeFiles} {...this.props} />
        <CodeFilesNavActions {...this.props}/>
      </React.Fragment>
    )
  }
}

export default CodeFilesNav;
