import React, { Component } from 'react';
import path from 'path-posix';

class FilesViewer extends Component {
  render() {
    const { files, executablePath } = this.props;
    if(files && files.length > 0) {
      console.log({ executablePath })
      debugger;
      return (
        <div className="files-viewer">
          <label> Importing Files </label>
          <div className="pane">
            {files.map(({ name }) => (
              <div key={name}>
                { path.join(executablePath, name) }
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null;
  }
}

export default FilesViewer;
