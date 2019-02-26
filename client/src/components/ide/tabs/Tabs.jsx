import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeTab } from 'redux/actions';
import './Tabs.scss';
import Tab from './Tab';

class Tabs extends Component {
  render() {
    const { ideState: { tabsOpen }, stageContainer } = this.props;
    if(tabsOpen.length > 0) {
      return (
        <div className="ide-tabs">
          {tabsOpen.map((tab) => (
              <Tab tab={tab} key={JSON.stringify(tab)} stageContainer={stageContainer} />
          ))}
        </div>
      )
    }
    return null;
  }
}

const mapStateToProps = ({ ideState }) => ({ ideState });

const mapDispatchToProps = { closeTab }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tabs);
