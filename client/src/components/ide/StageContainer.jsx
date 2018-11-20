import React, { Component } from 'react';
import apiQuery from '../../utils/apiQuery';
import findContainer from '../../queries/stageContainer/find';
import Sidebar from './Sidebar';
import './StageContainer.scss';

class StageContainer extends Component {
  state = {
    stageContainer: null
  }
  componentDidMount() {
    const { containerId } = this.props.match.params;
    apiQuery(findContainer, { id: containerId }).then(({ stageContainer }) => {
      this.setState({ stageContainer });
    });
  }
  render() {
    const { stageContainer } = this.state;
    if(!stageContainer) return null;
    return (
      <div className="stage-container">
        <Sidebar stageContainer={stageContainer}/>
        <div className="content">
          <p>Welcome to {stageContainer && stageContainer.version}</p>
        </div>
      </div>
    )
  }
}

export default StageContainer;
