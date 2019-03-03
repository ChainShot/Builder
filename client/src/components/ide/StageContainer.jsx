import React, { Component } from 'react';
import { subscribe, unsubscribe } from 'utils/api/subscription';
import findContainer from 'queries/stageContainer/find';
import { setStageContainer } from 'redux/actions';
import { connect } from 'react-redux';
import Sidebar from './sidebar/Sidebar';
import './configuration/Config.scss';
import './StageContainer.scss';
import Tabs from './tabs/Tabs';
import Editor from './Editor';

class StageContainer extends Component {
  componentDidMount() {
    const { containerId } = this.props.match.params;
    const subscriptionIdx = subscribe(findContainer, containerId, 'stageContainer', ({ stageContainer }) => {
      this.props.setStageContainer(stageContainer)
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
    const { contentState: { stageContainer }} = this.props;
    if(!stageContainer) return null;
    return (
      <div className="stage-container">
        <div className="main-content">
          <Sidebar stageContainer={stageContainer}/>
          <div className="ide-content-container">
            <div className="ide-content">
              <Tabs stageContainer={stageContainer} />
              <Editor stageContainer={stageContainer} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ contentState }) => ({ contentState })
const mapDispatchToProps = { setStageContainer }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StageContainer);
