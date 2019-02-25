import React, { Component } from 'react';
import CodeFileNav from './CodeFileNav';
import CodeFilesNavActions from './CodeFilesNavActions';

class CodeFilesNav extends Component {
  render() {
    const { codeFiles } = this.props;
    return (
      <React.Fragment>
        {(codeFiles || []).map(cf => (
          <CodeFileNav key={cf.id} codeFile={cf} {...this.props} />
        ))}
        <CodeFilesNavActions {...this.props}/>
      </React.Fragment>
    )
  }
}

export default CodeFilesNav;
