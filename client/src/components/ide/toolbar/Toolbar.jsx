import React, { Component } from 'react';
import IntroToolbar from './IntroToolbar';
import { withRouter } from 'react-router-dom';
import PropsRoute from '../../PropsRoute';
import SVG from '../../SVG';
import { Link } from 'react-router-dom';
import './Toolbar.scss';

class Toolbar extends Component {
  render() {
    const { match: { params: { stageId }, url }, stageContainer } = this.props;
    if(!stageContainer) return null;
    return (
      <ul className="toolbar">
        <li className="logo">
          <Link to="/" exact>
            <SVG name="logotype"/>
          </Link>
        </li>
        <PropsRoute path="/content/:containerId/intro" component={IntroToolbar} stageContainer={stageContainer}/>
      </ul>
    )
  }
}

export default withRouter(Toolbar);
