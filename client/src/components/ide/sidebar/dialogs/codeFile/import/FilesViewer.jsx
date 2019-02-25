import React, { Component } from 'react';
import path from 'path-posix';
import './FilesViewer.scss';

class FilesViewer extends Component {
  render() {
    const { files, basePath } = this.props;
    if(files && files.length > 0) {
      return (
        <div className="files-viewer">
          <label> Importing Files ({files.length})</label>
          <div className="pane">
            {files.map(({ name }) => (
              <div key={name}>
                { path.join(basePath, name) }
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
