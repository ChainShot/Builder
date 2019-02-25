import React, { Component } from 'react';
import * as dialog from 'utils/dialog';
import { openSidebarStage, closeSidebarStage } from 'redux/actions';
import AddStage from './dialogs/stage/AddStage';
import SVG from 'components/SVG';
import './StagesNav.scss';
import { connect } from 'react-redux';
import StageCaret from './StageCaret';

class StagesNav extends Component {
  render() {
    const { stageContainer: { id, stages }} = this.props;
    const sortedStages = stages.sort((a,b) => a.position - b.position);
    return (
      <ul className="stages-nav">
        { sortedStages.map(stage => <StageCaret key={stage.id} stage={stage} {...this.props} /> ) }
        <li>
          <div className="action" onClick={() => dialog.open(AddStage, { containerId: id, position: stages.length })}>
            <SVG name="add" />
            <span>Add a Stage…</span>
          </div>
        </li>
      </ul>
    )
  }
}

const mapStateToProps = ({ sidebarState }) => ({ sidebarState });
const mapDispatchToProps = { openSidebarStage, closeSidebarStage }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StagesNav);
