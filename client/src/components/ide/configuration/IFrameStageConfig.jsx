import React, { Component } from 'react';
import './IFrameStageConfig.scss';
import StyledInput from '../../forms/StyledInput';

const SRC_HINT = 'The URL that the IFrame should display';

class IFrameStageConfig extends Component {
  render() {
    const { onChange,
      stage: { type, src }
    } = this.props;
    if(type !== 'VideoStage') return null;
    return (
      <React.Fragment>
        <StyledInput
          label="IFrame URL"
          type="text"
          value={src}
          field="src"
          hint={SRC_HINT}
          onChange={({ target: { value }}) => onChange({ src: value })}/>
      </React.Fragment>
    )
  }
}

export default IFrameStageConfig;
