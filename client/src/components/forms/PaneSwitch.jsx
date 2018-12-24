import React, { Component } from 'react';
import './PaneSwitch.scss';

class PaneSwitch extends Component {
  state = {
    idx: 0,
  }
  chooseOption(idx) {
    const { options, onChange } = this.props;
    this.setState({ idx });
    onChange(options[idx].value);
  }
  render() {
    const { label, options } = this.props;
    const { idx } = this.state;
    const [option1, option2] = options;
    const defaultClasses = ['option'];
    const activeClasses = defaultClasses.concat('active');
    const option1Classes = idx === 0 ? activeClasses : defaultClasses
    const option2Classes = idx === 1 ? activeClasses : defaultClasses;
    return (
      <label>
        <span>{ label }</span>
        <div className="pane-switch">
          <div className={option1Classes.join(' ')}
               onClick={() => this.chooseOption(0)}>
            { option1.display }
          </div>
          <div className={option2Classes.join(' ')}
               onClick={() => this.chooseOption(1)}>
            { option2.display }
          </div>
        </div>
      </label>
    )
  }
}

export default PaneSwitch;
