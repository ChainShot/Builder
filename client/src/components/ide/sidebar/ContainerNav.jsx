import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchPath, withRouter } from 'react-router-dom';
import ContainerSubnav from './ContainerSubnav'
import { openSidebarContainer, closeSidebarContainer } from '../../../redux/actions';
import './ContainerNav.scss';

class ContainerNav extends Component {
  toggle = () => {
    const { openSidebarContainer, closeSidebarContainer, sidebarState: { containerOpen } } = this.props;
    if(containerOpen) {
      closeSidebarContainer();
    }
    else {
      openSidebarContainer();
    }
  }
  render() {
    const { stageContainer, sidebarState: { containerOpen } } = this.props;
    const { stageContainerGroup: { title } } = stageContainer;
    const classes = ['directory'];
    if(containerOpen) classes.push('open');
    return (
      <ul className="container-nav">
        <li className="caret">
          <div className={classes.join(' ')} onClick={this.toggle}>
            <span>{ title }</span>
          </div>
          { containerOpen && <ContainerSubnav stageContainer={stageContainer} /> }
        </li>
      </ul>
    )
  }
}

const mapStateToProps = ({ sidebarState }) => ({ sidebarState });
const mapDispatchToProps = { openSidebarContainer, closeSidebarContainer }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ContainerNav));
