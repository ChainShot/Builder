import React, { Component } from 'react';
import SVG from 'components/SVG';
import './ContainerSubnav.scss';
import { IDE_TAB_TYPES } from 'config';
import ActionNav from './ActionNav';
import { connect } from 'react-redux';
import { openTab } from 'redux/actions';

class ContainerSubnav extends Component {
  attributesFor(type) {
    return { stageId: null, id: null, type }
  }
  render() {
    const configurationAttrs = this.attributesFor(IDE_TAB_TYPES.STAGE_CONTAINER_CONFIG);
    const introAttrs = this.attributesFor(IDE_TAB_TYPES.STAGE_CONTAINER_INTRO);
    return (
      <ul className="sub-nav">
        <ActionNav attrs={configurationAttrs}>
          <SVG name="wrench"/>
          <span>configuration</span>
        </ActionNav>

        <ActionNav attrs={introAttrs}>
          <SVG name="file"/>
          <span>intro.md</span>
        </ActionNav>
      </ul>
    )
  }
}

const mapDispatchToProps = { openTab }

export default connect(
  null,
  mapDispatchToProps
)(ContainerSubnav);
