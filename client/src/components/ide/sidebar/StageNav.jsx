import React, { Component } from 'react';
import './CodeFilesNav.scss';
import SkeletonsNav from './SkeletonsNav';
import CodeFilesNav from './CodeFilesNav';
import ValidationsNav from './ValidationsNav';
import SVG from 'components/SVG';
import { openTab } from 'redux/actions';
import { connect } from 'react-redux';
import { IDE_TAB_TYPES } from 'config';

class StageNav extends Component {
  openTab(type) {
    const { stage } = this.props;
    this.props.openTab(stage.id, type);
  }
  render() {
    const { stage } = this.props;
    const { codeFiles, projectSkeletons } = stage;
    return (
      <ul className="code-files-nav">
        <li>
          <div className="action" onClick={() => this.openTab(IDE_TAB_TYPES.STAGE_CONFIG)}>
            <SVG name="wrench"/>
            <span>configuration</span>
          </div>
        </li>
        <li>
          <div className="action" onClick={() => this.openTab(IDE_TAB_TYPES.STAGE_DETAILS)}>
            <SVG name="file"/>
            <span>details.md</span>
          </div>
        </li>
        <li>
          <div className="action" onClick={() => this.openTab(IDE_TAB_TYPES.STAGE_TASK)}>
            <SVG name="file"/>
            <span>task.md</span>
          </div>
        </li>
        <li>
          <div className="action" onClick={() => this.openTab(IDE_TAB_TYPES.STAGE_COMPLETION)}>
            <SVG name="file"/>
            <span>completion.md</span>
          </div>
        </li>
        <ValidationsNav {...this.props} />
        <SkeletonsNav projectSkeletons={projectSkeletons} {...this.props} />
        <CodeFilesNav codeFiles={codeFiles} {...this.props} />
      </ul>
    )
  }
}


const mapDispatchToProps = { openTab }

export default connect(
  null,
  mapDispatchToProps,
)(StageNav);
