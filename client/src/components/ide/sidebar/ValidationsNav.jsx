import React, { Component } from 'react';
import SVG from 'components/SVG';
import { IDE_TAB_TYPES } from 'config';
import ActionNav from './ActionNav';

const VALIDATION_LANGUAGES = ['vyper', 'solidity'];

class ValidationsNav extends Component {
  render() {
    const { stage } = this.props;
    if(VALIDATION_LANGUAGES.indexOf(stage.language) >= 0) {
      const tabAttrs = {
        stageId: stage.id,
        type: IDE_TAB_TYPES.STAGE_VALIDATIONS,
        id: null,
      }
      return (
        <ActionNav attrs={tabAttrs}>
          <SVG name="file"/>
          <span>validations.json</span>
        </ActionNav>
      )
    }
    return null;
  }
}

export default ValidationsNav;
