import React, { Component } from 'react';
import MarkdownToolbar from './MarkdownToolbar';
import SVG from '../../SVG';
import './IntroToolbar.scss';

class IntroToolbar extends Component {
  render() {
    const {stageContainer} = this.props;
    return (
      <React.Fragment>
        <MarkdownToolbar stageContainer={stageContainer}/>
        <li className="docs">
          <SVG name="book" />
          <div> Markdown Docs </div>
        </li>
      </React.Fragment>
    )
  }
}

export default IntroToolbar;
