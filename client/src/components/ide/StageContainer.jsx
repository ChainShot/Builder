import React, { Component } from 'react';
import { subscribe, unsubscribe } from '../../utils/api/subscription';
import findContainer from '../../queries/stageContainer/find';
import Sidebar from './sidebar/Sidebar';
import './configuration/Config.scss';
import './StageContainer.scss';
import Tabs from './tabs/Tabs';
import Editor from './Editor';
import Intro from './markdown/Intro';
import ContainerConfig from './configuration/ContainerConfig';
import UpdateWrapper from '../UpdateWrapper';

class StageContainer extends Component {
  state = {
    stageContainer: null
  }
  componentDidMount() {
    const { containerId } = this.props.match.params;
    const subscriptionIdx = subscribe(findContainer, containerId, 'stageContainer', ({ stageContainer }) => {
      this.setState({ stageContainer });
    });
    this.setState({ subscriptionIdx });
  }
  componentWillUnmount() {
    const { subscriptionIdx } = this.state;
    if(subscriptionIdx) {
      unsubscribe(subscriptionIdx);
    }
  }
  render() {
    const { stageContainer } = this.state;
    if(!stageContainer) return null;
    return (
      <div className="stage-container">
        <div className="main-content">
          <Sidebar stageContainer={stageContainer}/>
          <div className="ide-content">
            <Tabs stageContainer={stageContainer} />
            <Editor stageContainer={stageContainer} />
          </div>
        </div>
      </div>
    )
  }
}

export default StageContainer;
