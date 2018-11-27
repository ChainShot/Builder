import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import ReactMarkdown from 'react-markdown';
import modifyStage from '../../mutations/stage/modify';
import apiMutation from '../../utils/api/mutation';
import './Details.scss';

class Details extends Component {
  updateDetails(details) {
    const { id } = this.props.stageContainer;
    apiMutation(modifyStage, { id, details });
  }
  render() {
    const { details } = this.props.stage;
    return (
      <div className="details">
        <CodeEditor mode="markdown" code={details} onUpdate={(x) => this.updateDetails(x)} />
        <div className="display">
          <ReactMarkdown source={details} />
        </div>
      </div>
    )
  }
}

export default Details;
