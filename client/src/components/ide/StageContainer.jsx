import React, { Component } from 'react';
import apiQuery from '../../utils/apiQuery';
import findContainer from '../../queries/stageContainer/find';
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
    return (
      <div className="stage-container">
        Welcome to {stageContainer && stageContainer.version}
      </div>
    )
  }
}

export default StageContainer;
