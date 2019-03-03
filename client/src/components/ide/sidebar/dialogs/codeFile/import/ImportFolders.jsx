import React, { Component } from 'react';
import SVG from 'components/SVG';
import './ImportFolders.scss';
import FilesViewer from './FilesViewer';

function isCodeFile(name) {
  return  /\.(py|js|sol)$/.test(name);
}

class ImportFolders extends Component {
  clickFileInput = () => {
    this.refs.fileInput.click();
  }
  onChange = async (evt) => {
    const files = await Promise.all([...evt.target.files]
      .filter(x => isCodeFile(x.name))
      .map((file, idx) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.readAsText(file, 'UTF-8');
          reader.onload = readerEvent => {
            const content = readerEvent.target.result;
            resolve({
              relativePath: file.webkitRelativePath.replace(file.name, ""),
              name: file.name,
              content
            });
          }
        });
      })
    );
    if(files.length > 0) {
      this.props.updateFiles(files);
    }
  }
  render() {
    const { basePath, files } = this.props;
    return (
      <div className="import-folders">
        <div className="import-action" onClick={this.clickFileInput}>
          <SVG name="folders"/>
          <span>browse folders…</span>
          <input
            ref="fileInput"
            type="file"
            onChange={this.onChange}
            accept=".sol,.js,.py"
            style={{ display: 'none' }}
            multiple webkitdirectory="true"/>
        </div>

        <FilesViewer
          files={files}
          basePath={basePath}/>
      </div>
    )
  }
}

export default ImportFolders;
