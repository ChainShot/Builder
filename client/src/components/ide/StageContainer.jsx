import React, { Component } from 'react';
import apiQuery from '../../utils/apiQuery';
import StageLoader from './StageLoader';
import findContainer from '../../queries/stageContainer/find';
import Sidebar from './sidebar/Sidebar';
import Stage from './Stage';
import './StageContainer.scss';
import Intro from './Intro';
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
    const { match: { params: { containerId }, url } } = this.props;
    return (
      <div className="stage-container">
        <Sidebar stageContainer={stageContainer} basename={url}/>
        <Route path="/content/:containerId/stage/:stageId" component={StageLoader} />
        <Route path="/content/:containerId/intro" component={() => <Intro stageContainer={stageContainer} />} />
      </div>
    )
  }
}

export default StageContainer;
