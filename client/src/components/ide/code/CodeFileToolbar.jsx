import React, { Component } from 'react';
import './CodeFileToolbar.scss';
import Output from './Output';
import SVG from '../../SVG';

class CodeFileToolbar extends Component {
  state = {
    pane: null,
  }
  renderPane() {
    const { pane } = this.state;
    if(pane === 'output') {
      return <Output />
    }
    return null;
  }
  changePane(pane) {
    this.setState({ pane });
    window.requestAnimationFrame(() => window.dispatchEvent(new CustomEvent('resize')));
  }
  render() {
    return (
      <div className="code-file-toolbar">
        <ul className="actions">
          <li onClick={() => this.changePane('compilation')}>
            <SVG name="code"/>
            Compilation
          </li>
          <li onClick={() => this.changePane('output')}>
            <SVG name="play"/>
            Run
          </li>
        </ul>
        { this.renderPane() }
      </div>
    )
  }
}

export default CodeFileToolbar;
