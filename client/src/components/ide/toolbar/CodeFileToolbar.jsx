import React, { Component } from 'react';
import SaveToolbar from './SaveToolbar';
import CodeToolbar from './CodeToolbar';
import SVG from '../../SVG';
import { READ_THE_DOCS } from '../../../config';

class CodeFileToolbar extends Component {
  render() {
    return (
      <React.Fragment>
        <SaveToolbar />
        <CodeToolbar />
        <li className="docs">
          <a href={`${READ_THE_DOCS}/content.html`} target="_blank">
            <SVG name="book" />
            <div> CodeFile Docs </div>
          </a>
        </li>
      </React.Fragment>
    )
  }
}

export default CodeFileToolbar;
