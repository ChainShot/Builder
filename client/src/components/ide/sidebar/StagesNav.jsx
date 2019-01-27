import React, { Component } from 'react';
import { matchPath } from 'react-router-dom';
import CodeFilesNav from './CodeFilesNav';
import * as dialog from '../../../utils/dialog';
import { openSidebarStage, closeSidebarStage } from '../../../redux/actions';
import AddStage from './AddStage';
import SVG from '../../SVG';
import './StagesNav.scss';
import { connect } from 'react-redux';

class StagesNav extends Component {
  render() {
    const { stageContainer: { id, stages }} = this.props;
    const sortedStages = stages.sort((a,b) => a.position - b.position);
    return (
      <ul className="stages-nav">
        { sortedStages.map(stage => <StageNav key={stage.id} stage={stage} {...this.props} /> ) }
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

class StageNav extends Component {
  toggle = () => {
    const { stage: { id }, sidebarState: { stagesOpen }} = this.props;
    if(stagesOpen.indexOf(id) >= 0) {
      this.props.closeSidebarStage(id);
    }
    else {
      this.props.openSidebarStage(id);
    }
  }
  render() {
    const { basename, location, stage: { id, title }, sidebarState: { stagesOpen }} = this.props;
    const path = `${basename}/stage/${id}`;
    const isOpen = stagesOpen.indexOf(id) >= 0;
    const classes = ['directory'];
    if(isOpen) classes.push('open');
    const match = matchPath(location.pathname, { path });
    if(match) classes.push('active');
    return (
      <li className="caret">
        <div className={classes.join(' ')} onClick={this.toggle}> {title} </div>
        { isOpen && <CodeFilesNav {...this.props} basename={path} /> }
      </li>
    )
  }
}


const mapStateToProps = ({ sidebarState }) => ({ sidebarState });
const mapDispatchToProps = { openSidebarStage, closeSidebarStage }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StagesNav);
