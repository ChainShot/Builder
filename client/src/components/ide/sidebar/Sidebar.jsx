import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import StagesNav from './StagesNav';
import ContainerNav from './ContainerNav';
import './Sidebar.scss';

const s = n => n === 1 ? '' : 's';

class Sidebar extends Component {
  render() {
    const { stageContainer, basename, location: {pathname} } = this.props;
    const { stages } = stageContainer;
    return (
      <div className="stage-container-sidebar">
        <ContainerNav
            key={pathname} // force re-render on route change
            basename={basename}
            stageContainer={stageContainer}/>
        <div className="stages">
          <label>{stages.length} Stage{s(stages.length)}</label>
          <StagesNav {...this.props} />
        </div>
      </div>
    )
  }
}

export default withRouter(Sidebar);
