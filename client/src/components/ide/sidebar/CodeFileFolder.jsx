import React, { Component } from 'react';
import SVG from 'components/SVG';
import './CodeFileFolder.scss';
import CodeFileDirectory from './CodeFileDirectory';

class CodeFileFolder extends Component {
  state = {
    opened: true,
  }
  render() {
    const { path, codeFiles } = this.props;
    const classes = ['code-file-folder'];
    const { opened } = this.state;
    const folderName = path.split("/").slice(-1)[0];
    if(opened) {
      return (
        <div className={classes.join(' ')}>
          <div className="folder">
            <SVG name="folder-open" />
            <div> {folderName} </div>
          </div>
          <div className="contents">
            <CodeFileDirectory path={path} codeFiles={codeFiles}/>
          </div>
        </div>
      )
    }
    return (
      <div className={classes.join(' ')}>
        <div className="folder">
          <SVG name="folder" />
          <div> {folderName} </div>
        </div>
      </div>
    )
  }
}

export default CodeFileFolder;
