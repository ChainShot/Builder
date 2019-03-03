import React, { Component } from 'react';
import SVG from 'components/SVG';
import './CodeFileFolder.scss';
import CodeFileDirectory from './CodeFileDirectory';
import { connect } from 'react-redux';
import { openFolder, closeFolder } from 'redux/actions';

class CodeFileFolder extends Component {
  openFolder = () => {
    const { path, stage } = this.props;
    this.props.openFolder(stage.id, path);
  }
  closeFolder = () => {
    const { path, stage } = this.props;
    this.props.closeFolder(stage.id, path);
  }
  render() {
    const { path, codeFiles, stage, sidebarState: {foldersOpen}} = this.props;
    const classes = ['code-file-folder'];
    const opened = foldersOpen.find(x => x.stageId === stage.id && x.folderPath === path);
    const folderName = path.split("/").slice(-1)[0];
    if(opened) {
      return (
        <div className={classes.join(' ')}>
          <div className="folder" onClick={this.closeFolder}>
            <SVG name="folder-open" />
            <div> {folderName} </div>
          </div>
          <div className="contents">
            <CodeFileDirectory path={path} stage={stage} codeFiles={codeFiles}/>
          </div>
        </div>
      )
    }
    return (
      <div className={classes.join(' ')}>
        <div className="folder" onClick={this.openFolder}>
          <SVG name="folder" />
          <div> {folderName} </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ sidebarState }) => ({ sidebarState });

const mapDispatchToProps = { openFolder, closeFolder }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeFileFolder);
