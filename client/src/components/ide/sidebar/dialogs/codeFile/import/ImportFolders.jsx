import React, { Component } from 'react';
import SVG from 'components/SVG';

class ImportFolders extends Component {
  clickFileInput = () => {
    this.refs.fileInput.click();
  }
  onChange = (evt) => {
    console.log( [...evt.target.files] );
    [...evt.target.files].forEach((file) => {
      // setting up the reader
      const reader = new FileReader();
      reader.readAsText(file,'UTF-8');

      // here we tell the reader what to do when it's done reading...
      reader.onload = readerEvent => {
        const content = readerEvent.target.result; // this is the content
        console.log( content );
      }
    });
  }
  render() {
    return (
      <div className="action" onClick={this.clickFileInput}>
        <SVG name="file-plus"/>
        <span>import code file…</span>
        <input
          ref="fileInput"
          type="file"
          onChange={this.onChange}
          accept=".sol,.js,.py"
          style={{ display: 'none' }}
          multiple webkitdirectory="true"/>
      </div>
    )
  }
}

export default ImportFolders;
