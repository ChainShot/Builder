import React, { Component } from 'react';
import './CodeFilesNav.scss';
import SkeletonsNav from './SkeletonsNav';
import CodeFilesNav from './CodeFilesNav';
import ValidationsNav from './ValidationsNav';
import ActionNav from './ActionNav';
import SVG from 'components/SVG';
import { IDE_TAB_TYPES } from 'config';

class StageNav extends Component {
  attributesFor(type) {
    const { stage } = this.props;
    return { stageId: stage.id, type, id: null }
  }
  render() {
    const { stage } = this.props;
    const { codeFiles, projectSkeletons } = stage;
    const configurationAttrs = this.attributesFor(IDE_TAB_TYPES.STAGE_CONFIG);
    const detailsAttrs = this.attributesFor(IDE_TAB_TYPES.STAGE_DETAILS);
    const taskAttrs = this.attributesFor(IDE_TAB_TYPES.STAGE_TASK);
    const completionAttrs = this.attributesFor(IDE_TAB_TYPES.STAGE_COMPLETION);
    return (
      <ul className="code-files-nav">
        <ActionNav attrs={configurationAttrs}>
          <SVG name="wrench"/>
          <span>configuration</span>
        </ActionNav>
        <ActionNav attrs={detailsAttrs}>
          <SVG name="file"/>
          <span>details.md</span>
        </ActionNav>
        <ActionNav attrs={taskAttrs}>
          <SVG name="file"/>
          <span>task.md</span>
        </ActionNav>
        <ActionNav attrs={completionAttrs}>
          <SVG name="file"/>
          <span>completion.md</span>
        </ActionNav>
        <ValidationsNav {...this.props} />
        <SkeletonsNav projectSkeletons={projectSkeletons} stage={stage} />
        <CodeFilesNav codeFiles={codeFiles} {...this.props} />
      </ul>
    )
  }
}

export default StageNav;
