import React, { Component } from 'react';
import StageNav from './StageNav';

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
    const { stage, stageContainer, sidebarState: { stagesOpen }} = this.props;
    const { id, title } = stage;
    const isOpen = stagesOpen.indexOf(id) >= 0;
    const classes = ['directory'];
    if(isOpen) classes.push('open');
    return (
      <li className="caret">
        <div className={classes.join(' ')} onClick={this.toggle}> {title} </div>
        { isOpen && <StageNav stage={stage} stageContainer={stageContainer}/> }
      </li>
    )
  }
}

export default StageCaret;
