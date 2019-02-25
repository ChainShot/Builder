import React, { Component } from 'react';
import SVG from 'components/SVG';
import FilesViewer from './FilesViewer';
import './ImportFiles.scss';

class ImportFiles extends Component {
  clickFileInput = () => {
    this.refs.fileInput.click();
  }
  onChange = async (evt) => {
    const files = await Promise.all([...evt.target.files].map((file, idx) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
          const content = readerEvent.target.result;
          resolve({
            name: file.name,
            content
          });
        }
      });
    }));
    this.props.updateFiles(files);
  }
  render() {
    const { basePath, files } = this.props;
    return (
      <div className="import-files">
        <div className="import-action" onClick={this.clickFileInput}>
          <SVG name="import-file"/>
          <span>browse files…</span>
          <input
            ref="fileInput"
            type="file"
            onChange={this.onChange}
            accept=".sol,.js,.py"
            style={{ display: 'none' }}
            multiple/>
        </div>

        <FilesViewer
          files={files}
          basePath={basePath}/>
      </div>
    )
  }
}

export default ImportFiles;
