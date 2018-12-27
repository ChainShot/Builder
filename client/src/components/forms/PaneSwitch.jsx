import React, { Component } from 'react';
import './PaneSwitch.scss';

class PaneSwitch extends Component {
  state = {
    idx: 0,
  }
  chooseOption(idx) {
    this.setState({ idx });
  }
  render() {
    const { labels } = this.props;
    const { idx } = this.state;
    const [label1, label2] = labels;
    const defaultClasses = ['option'];
    const activeClasses = defaultClasses.concat('active');
    const option1Classes = idx === 0 ? activeClasses : defaultClasses
    const option2Classes = idx === 1 ? activeClasses : defaultClasses;
    return (
      <div className="pane-switch">
        <label>
          <div className="options">
            <div className={option1Classes.join(' ')}
                 onClick={() => this.chooseOption(0)}>
              { label1 }
            </div>
            <div className={option2Classes.join(' ')}
                 onClick={() => this.chooseOption(1)}>
              { label2 }
            </div>
          </div>
        </label>
        <div className="pane">
          { this.props.children[idx] }
        </div>
      </div>
    )
  }
}

export default PaneSwitch;
