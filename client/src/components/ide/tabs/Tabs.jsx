import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeTab, setActiveTab, closeOtherTabs, closeTabsToTheRight } from 'redux/actions';
import './Tabs.scss';
import Tab from './Tab';

class Tabs extends Component {
  setActive = (idx) => {
    this.props.setActiveTab(idx)
  }
  closeTab = (tab) => {
    this.props.closeTab({ ...tab })
  }
  closeOtherTabs = (tab) => {
    this.props.closeOtherTabs(tab);
  }
  closeTabsToTheRight = (tab) => {
    this.props.closeTabsToTheRight(tab);
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
                tabsOpen={tabsOpen}
                closeTabsToTheRight={() => this.closeTabsToTheRight(tab)}
                closeOtherTabs={() => this.closeOtherTabs(tab)}
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

const mapDispatchToProps = { closeOtherTabs, closeTab, setActiveTab, closeTabsToTheRight }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tabs);
