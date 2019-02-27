import React, { Component } from 'react';
import SVG from 'components/SVG';
import { connect } from 'react-redux';
import { openTab } from 'redux/actions';
import { IDE_TAB_TYPES } from 'config';

const VALIDATION_LANGUAGES = ['vyper', 'solidity'];

class ValidationsNav extends Component {
  openTab = () => {
    const { stage } = this.props;
    this.props.openTab(stage.id, IDE_TAB_TYPES.STAGE_VALIDATIONS);
  }
  render() {
    const { stage } = this.props;
    if(VALIDATION_LANGUAGES.indexOf(stage.language) >= 0) {
      return (
        <li>
          <div className="action" onClick={this.openTab}>
            <SVG name="file"/>
            <span>validations.json</span>
          </div>
        </li>
      )
    }
    return null;
  }
}

const mapDispatchToProps = { openTab }

export default connect(
  null,
  mapDispatchToProps
)(ValidationsNav);
