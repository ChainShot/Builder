import React, { Component } from 'react';
import UpdateWrapper from 'components/UpdateWrapper';
import CodeFileConfig from './configuration/CodeFileConfig';
import StageConfig from './configuration/StageConfig';
import ContainerConfig from './configuration/ContainerConfig';
import BadgeTypeConfig from './configuration/BadgeTypeConfig';
import SkeletonConfig from './configuration/SkeletonConfig';
import CodeFileSolution from './codeFile/CodeFileSolution';
import CodeFile from './codeFile/CodeFile';
import Intro from './markdown/Intro';
import Details from './markdown/Details';
import Task from './markdown/Task';
import Completion from './markdown/Completion';
import Validations from './Validations';
import { IDE_TAB_TYPES } from 'config';

class EditorPane extends Component {
  render() {
    const { stageContainer, activeTab } = this.props;
    const stage = stageContainer.stages.find(x => x.id === activeTab.stageId);
    switch (activeTab.type) {
      case IDE_TAB_TYPES.STAGE_CONTAINER_INTRO: {
        return <Intro stageContainer={stageContainer} />
      }
      case IDE_TAB_TYPES.STAGE_CONTAINER_CONFIG: {
        const uniqueKey = `container-${stageContainer.id}-config`;
        return (
          <UpdateWrapper
            key={uniqueKey}
            debounceKey={uniqueKey}
            child={ContainerConfig}
            stageContainer={stageContainer} />
        )
      }
      case IDE_TAB_TYPES.BADGE_CONFIG: {
        const uniqueKey = `badgeType-${activeTab.id}-config`;
        const badgeType = stageContainer.stageContainerGroup.badgeTypes.find(x => x.id === activeTab.id);
        return (
          <UpdateWrapper
            key={uniqueKey}
            debounceKey={uniqueKey}
            child={BadgeTypeConfig}
            badgeType={badgeType} />
        )
      }
      case IDE_TAB_TYPES.STAGE_CONFIG: {
        const uniqueKey = `${stage.id}-config`;
        return (
          <UpdateWrapper
            key={uniqueKey}
            debounceKey={uniqueKey}
            child={StageConfig}
            stage={stage} />
        )
      }
      case IDE_TAB_TYPES.STAGE_DETAILS: {
        return <Details stage={stage} />
      }
      case IDE_TAB_TYPES.STAGE_TASK: {
        return <Task stage={stage} />
      }
      case IDE_TAB_TYPES.STAGE_COMPLETION: {
        return <Completion stage={stage} />
      }
      case IDE_TAB_TYPES.STAGE_VALIDATIONS: {
        const uniqueKey = `${stage.id}-validations`;
        return (
          <UpdateWrapper
            key={uniqueKey}
            debounceKey={uniqueKey}
            child={Validations}
            stage={stage} />
        )
      }
      case IDE_TAB_TYPES.CODE_FILE_CONFIG: {
        const codeFile = stage.codeFiles.find(x => x.id === activeTab.id);
        const uniqueKey = `${codeFile.id}-config`;
        return (
          <UpdateWrapper
            key={uniqueKey}
            debounceKey={uniqueKey}
            child={CodeFileConfig}
            codeFile={codeFile}
            stage={stage} />
        )
      }
      case IDE_TAB_TYPES.CODE_FILE_SOLUTION: {
        const codeFile = stage.codeFiles.find(x => x.id === activeTab.id);
        return (
          <CodeFileSolution stage={stage} codeFile={codeFile} />
        )
      }
      case IDE_TAB_TYPES.CODE_FILE_INITIAL_CODE: {
        const codeFile = stage.codeFiles.find(x => x.id === activeTab.id);
        return (
          <CodeFile stage={stage} codeFile={codeFile} />
        )
      }
      case IDE_TAB_TYPES.SKELETON_CONFIG: {
        const skeleton = stage.projectSkeletons.find(x => x.id === activeTab.id);
        const uniqueKey = `${stage.id}-skeleton-${activeTab.id}`
        return (
          <UpdateWrapper
            key={uniqueKey}
            debounceKey={uniqueKey}
            child={SkeletonConfig}
            skeletonId={skeleton.id}
            stage={stage} />
        )
      }
      default:
        return null;
    }
  }
}

export default EditorPane;
