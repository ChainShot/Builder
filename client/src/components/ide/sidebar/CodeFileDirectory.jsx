import React, { Component } from 'react';
import CodeFileFolder from './CodeFileFolder';
import CodeFileNav from './CodeFileNav';
import './CodeFileDirectory.scss';

function beginsWith(str, substr) {
  return str.slice(0, substr.length) === substr;
}

class CodeFileDirectory extends Component {
  render() {
    const { codeFiles, path, stage } = this.props;

    const folders = codeFiles
      .filter(x => beginsWith(x.executablePath, path || ""))
      .reduce((arr, codeFile) => {
        const pathParts = path ? path.split("/") : [];
        const parts = codeFile.executablePath.split("/").filter(x => x).slice(pathParts.length);
        const fullPath = pathParts.concat(parts[0]).join("/");
        if(parts.length > 1 && arr.indexOf(fullPath) === -1) {
           return [...arr, fullPath];
        }
        return arr;
      }, []);

    const files = codeFiles.filter((codeFile) => {
      if(beginsWith(codeFile.executablePath, path || "")) {
        const pathPartsLength = path ? path.split("/").length : 0;
        const parts = codeFile.executablePath.split("/").filter(x => x).slice(pathPartsLength);
        return (parts.length === 1);
      }
    });

    return (
      <div className="code-file-directory">
        {folders.map((folder) => (
          <CodeFileFolder key={folder} stage={stage} codeFiles={codeFiles} path={folder} />
        ))}
        {files.map((file) => (
          <CodeFileNav key={file.id} basename={""} codeFile={file} />
        ))}
      </div>
    )
  }
}

export default CodeFileDirectory;
