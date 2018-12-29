import React, { Component } from 'react';
import MarkdownToolbar from './MarkdownToolbar';
import ValidationsToolbar from './ValidationsToolbar';
import StageConfigToolbar from './StageConfigToolbar';
import PropsRoute from '../../PropsRoute';
import SVG from '../../SVG';
import { Link } from 'react-router-dom';
import './Toolbar.scss';

class Toolbar extends Component {
  render() {
    const { stageContainer } = this.props;
    if(!stageContainer) return null;
    return (
      <ul className="toolbar">
        <li className="logo">
          <Link to="/">
            <SVG name="logotype"/>
          </Link>
        </li>
        <PropsRoute path="/content/:containerId/intro" component={MarkdownToolbar} />
        <PropsRoute exact path="/content/:containerId/stage/:stageId" component={StageConfigToolbar} />
        <PropsRoute path="/content/:containerId/stage/:stageId/(details|task)" component={MarkdownToolbar} />
        <PropsRoute path="/content/:containerId/stage/:stageId/validations" component={ValidationsToolbar} />
      </ul>
    )
  }
}

export default Toolbar;
