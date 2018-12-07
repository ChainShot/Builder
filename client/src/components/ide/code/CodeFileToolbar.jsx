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
  classes(pane) {
    return this.state.pane === pane ? 'active' : '';
  }
  render() {
    return (
      <div className="code-file-toolbar">
        { this.renderPane() }
        <ul className="actions">
          <li className={this.classes('compilation')}
              onClick={() => this.changePane('compilation')}>
            <SVG name="code"/>
            Compilation
          </li>
          <li className={this.classes('output')}
              onClick={() => this.changePane('output')}>
            <SVG name="play"/>
            Run
          </li>
        </ul>
      </div>
    )
  }
}

export default CodeFileToolbar;
