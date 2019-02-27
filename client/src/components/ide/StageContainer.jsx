import React, { Component } from 'react';
import { subscribe, unsubscribe } from '../../utils/api/subscription';
import findContainer from '../../queries/stageContainer/find';
import Sidebar from './sidebar/Sidebar';
import Stage from './Stage';
import './StageContainer.scss';
import Tabs from './tabs/Tabs';
import Editor from './Editor';
import Intro from './markdown/Intro';
import PropsRoute from '../PropsRoute';
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
    const { match: { url } } = this.props;
    // <PropsRoute path="/content/:containerId/" exact component={UpdateWrapper} child={ContainerConfig} stageContainer={stageContainer}/>
    // <PropsRoute path="/content/:containerId/intro" component={Intro} stageContainer={stageContainer}/>
    // <PropsRoute path="/content/:containerId/badge/:badgeTypeId" component={BadgeType} stageContainer={stageContainer}/>
    // <PropsRoute path="/content/:containerId/stage/:stageId" component={Stage} stageContainer={stageContainer}/>
    return (
      <div className="stage-container">
        <div className="main-content">
          <Sidebar stageContainer={stageContainer} basename={url}/>
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
