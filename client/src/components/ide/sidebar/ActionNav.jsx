import React, { Component } from 'react';
import { openTab } from 'redux/actions';
import { connect } from 'react-redux';
import equalObjects from 'utils/equalObjects';

class ActionNav extends Component {
  openTab = () => {
    const { attrs: { stageId, type, id } } = this.props;
    this.props.openTab(stageId, type, id);
  }
  render() {
    const { stage, attrs, ideState: { tabsOpen, activeTabIdx } } = this.props;
    const activeTab = tabsOpen[activeTabIdx];
    const classes = ['action'];
    if(equalObjects(activeTab, attrs)) classes.push('active');
    return (
      <li>
        <div className={classes.join(' ')} onClick={this.openTab}>
          { this.props.children }
        </div>
      </li>
    )
  }
}

const mapStateToProps = ({ ideState }) => ({ ideState })
const mapDispatchToProps = { openTab }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActionNav);
