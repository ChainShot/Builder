import React, { Component } from 'react';
import MarkdownToolbar from './MarkdownToolbar';
import SVG from '../../SVG';
import { READ_THE_DOCS } from '../../../config';
import './IntroToolbar.scss';

class IntroToolbar extends Component {
  render() {
    const {stageContainer} = this.props;
    return (
      <React.Fragment>
        <MarkdownToolbar stageContainer={stageContainer}/>
        <li className="docs">
          <a href={`${READ_THE_DOCS}/content.html`} target="_blank">
            <SVG name="book" />
            <div> Markdown Docs </div>
          </a>
        </li>
      </React.Fragment>
    )
  }
}

export default IntroToolbar;
