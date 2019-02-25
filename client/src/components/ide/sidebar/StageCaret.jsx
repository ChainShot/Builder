import React, { Component } from 'react';
import StageNav from './StageNav';
import { matchPath } from 'react-router-dom';

class StageCaret extends Component {
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
        { isOpen && <StageNav {...this.props} basename={path} /> }
      </li>
    )
  }
}

export default StageCaret;
