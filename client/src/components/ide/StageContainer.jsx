import React, { Component } from 'react';
import apiQuery from '../../utils/apiQuery';
import StageLoader from './StageLoader';
import findContainer from '../../queries/stageContainer/find';
import Sidebar from './Sidebar';
import Stage from './Stage';
import './StageContainer.scss';
import { Route } from 'react-router-dom';

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
    const { containerId } = this.props.match.params;
    const basename = `/content/${containerId}`;
    return (
      <div className="stage-container">
        <Sidebar stageContainer={stageContainer} basename={basename}/>
        <Route path="/content/:containerId/stage/:stageId" component={StageLoader} />
      </div>
    )
  }
}

export default StageContainer;
