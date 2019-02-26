import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeTab, setActiveTab } from 'redux/actions';
import './Tabs.scss';
import Tab from './Tab';

class Tabs extends Component {
  setActive = (idx) => {
    this.props.setActiveTab(idx)
  }
  closeTab = (tab) => {
    this.props.closeTab({ ...tab })
  }
  render() {
    const { ideState: { tabsOpen, activeTabIdx }, stageContainer } = this.props;
    if(tabsOpen.length > 0) {
      return (
        <div className="ide-tabs">
          {tabsOpen.map((tab, idx) => (
              <Tab
                tab={tab}
                isActive={idx === activeTabIdx}
                key={JSON.stringify(tab)}
                closeTab={() => this.closeTab(tab)}
                setActive={() => this.setActive(idx)}
                stageContainer={stageContainer} />
          ))}
          <div className="rest" />
        </div>
      )
    }
    return null;
  }
}


const mapStateToProps = ({ ideState }) => ({ ideState });

const mapDispatchToProps = { closeTab, setActiveTab }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tabs);
