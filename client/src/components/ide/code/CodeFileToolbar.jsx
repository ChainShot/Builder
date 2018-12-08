import React, { Component } from 'react';
import './CodeFileToolbar.scss';
import Output from './Output';
import Compilation from './Compilation';
import SVG from '../../SVG';

const COMPILE_REGEX = /\w*(\.sol|\.v\.py)$/;

class CodeFileToolbar extends Component {
  state = {
    pane: null,
  }
  renderPane() {
    const { pane } = this.state;
    const { stage, codeFile } = this.props;
    if(pane === 'output') {
      return <Output stage={stage}
                     codeFile={codeFile}
                     hide={() => this.changePane('')}/>
    }
    if(pane === 'compilation') {
      return <Compilation stage={stage}
                     codeFile={codeFile}
                     hide={() => this.changePane('')}/>
    }
    return null;
  }
  changePane = (pane) => {
    if(pane === this.state.pane) this.setState({ pane: '' });
    else this.setState({ pane });
    window.requestAnimationFrame(() => window.dispatchEvent(new CustomEvent('resize')));
  }
  classes(pane) {
    return this.state.pane === pane ? 'active' : '';
  }
  renderCompileTab() {
    const { codeFile } = this.props;
    if(COMPILE_REGEX.test(codeFile.name)) {
      return (
        <li className={this.classes('compilation')}
            onClick={() => this.changePane('compilation')}>
          <SVG name="code"/>
          <div>Compilation</div>
        </li>
      )
    }
    return null;
  }
  render() {
    return (
      <div className="code-file-toolbar">
        { this.renderPane() }
        <ul className="actions">
          { this.renderCompileTab() }
          <li className={this.classes('output')}
              onClick={() => this.changePane('output')}>
            <SVG name="play"/>
            <div>Output</div>
          </li>
        </ul>
      </div>
    )
  }
}

export default CodeFileToolbar;
