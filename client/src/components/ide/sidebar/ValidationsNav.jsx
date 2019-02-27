import React, { Component } from 'react';
import SVG from 'components/SVG';
import { connect } from 'react-redux';
import { openTab } from 'redux/actions';
import { IDE_TAB_TYPES } from 'config';
import equalObjects from 'utils/equalObjects';

const VALIDATION_LANGUAGES = ['vyper', 'solidity'];

class ValidationsNav extends Component {
  openTab = ({ stageId, type, id}) => {
    this.props.openTab(stageId, type, id);
  }
  render() {
    const { stage, ideState: { tabsOpen, activeTabIdx } } = this.props;
    const activeTab = tabsOpen[activeTabIdx];
    if(VALIDATION_LANGUAGES.indexOf(stage.language) >= 0) {
      const tabAttrs = {
        stageId: stage.id,
        type: IDE_TAB_TYPES.STAGE_VALIDATIONS,
        id: null,
      }
      const classes = ['action'];
      if(equalObjects(tabAttrs, activeTab)) {
        classes.push('active');
      }
      return (
        <li>
          <div className={ classes.join(' ') } onClick={() => this.openTab(tabAttrs)}>
            <SVG name="file"/>
            <span>validations.json</span>
          </div>
        </li>
      )
    }
    return null;
  }
}

const mapStateToProps = ({ ideState }) => ({ ideState })
const mapDispatchToProps = { openTab }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidationsNav);
