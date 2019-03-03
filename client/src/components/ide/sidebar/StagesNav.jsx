import React, { Component } from 'react';
import * as dialog from 'utils/dialog';
import { openSidebarStage, closeSidebarStage, openTab } from 'redux/actions';
import AddStage from './dialogs/stage/AddStage';
import SVG from 'components/SVG';
import './StagesNav.scss';
import { connect } from 'react-redux';
import StageCaret from './StageCaret';
import { IDE_TAB_TYPES } from 'config';

class StagesNav extends Component {
  addStageDialog = () => {
    const { stageContainer: { id, stages }} = this.props;
    dialog.open(AddStage, { containerId: id, position: stages.length }).then((id) => {
      this.props.openSidebarStage(id);
      this.props.openTab(id, IDE_TAB_TYPES.STAGE_CONFIG);
    });
  }
  render() {
    const { stageContainer, sidebarState, openSidebarStage, closeSidebarStage, stageContainer: { stages }} = this.props;
    const sortedStages = stages.sort((a,b) => a.position - b.position);
    return (
      <ul className="stages-nav">
        {sortedStages.map(stage => (
          <StageCaret
            stageContainer={stageContainer}
            key={stage.id}
            stage={stage}
            openSidebarStage={openSidebarStage}
            closeSidebarStage={closeSidebarStage}
            sidebarState={sidebarState} />
        ))}
        <li>
          <div className="action" onClick={this.addStageDialog}>
            <SVG name="add" />
            <span>Add a Stage…</span>
          </div>
        </li>
      </ul>
    )
  }
}

const mapStateToProps = ({ sidebarState }) => ({ sidebarState });
const mapDispatchToProps = { openSidebarStage, closeSidebarStage, openTab }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StagesNav);
