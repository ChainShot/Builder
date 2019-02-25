import React, { Component } from 'react';
import SVG from '../../SVG';
import { NavLink } from 'react-router-dom';

const VALIDATION_LANGUAGES = ['vyper', 'solidity'];

class ValidationsNav extends Component {
  render() {
    const { basename, stage } = this.props;
    if(VALIDATION_LANGUAGES.indexOf(stage.language) >= 0) {
      return (
        <li>
          <NavLink to={`${basename}/validations`}>
            <SVG name="file"/>
            <span>validations.json</span>
          </NavLink>
        </li>
      )
    }
    return null;
  }
}

export default ValidationsNav;
