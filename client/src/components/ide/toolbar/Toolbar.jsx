import React, { Component } from 'react';
import MarkdownToolbar from './MarkdownToolbar';
import ValidationsToolbar from './ValidationsToolbar';
import StageConfigToolbar from './StageConfigToolbar';
import ContainerConfigToolbar from './ContainerConfigToolbar';
import CodeFileToolbar from './CodeFileToolbar';
import CodeFileConfigToolbar from './CodeFileConfigToolbar';
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
        <PropsRoute exact path="/content/:containerId" component={ContainerConfigToolbar} />
        <PropsRoute path="/content/:containerId/intro" component={MarkdownToolbar} />
        <PropsRoute exact path="/content/:containerId/stage/:stageId" component={StageConfigToolbar} />
        <PropsRoute path="/content/:containerId/stage/:stageId/(details|task)" component={MarkdownToolbar} />
        <PropsRoute path="/content/:containerId/stage/:stageId/validations" component={ValidationsToolbar} />
        <PropsRoute exact path="/content/:containerId/stage/:stageId/file/:codeFileId" component={CodeFileToolbar} stageContainer={stageContainer} />
        <PropsRoute path="/content/:containerId/stage/:stageId/file/:codeFileId/solution" component={CodeFileToolbar} />
        <PropsRoute path="/content/:containerId/stage/:stageId/file/:codeFileId/config" component={CodeFileConfigToolbar} />
      </ul>
    )
  }
}

export default Toolbar;
