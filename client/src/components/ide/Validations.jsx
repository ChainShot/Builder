import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import ReactMarkdown from 'react-markdown';
import modifyStage from '../../mutations/stage/modify';
import apiMutation from '../../utils/api/mutation';
import './Validations.scss';

class Validations extends Component {
  updateValidations(abiValidations) {
    const { id } = this.props.stageContainer;
    apiMutation(modifyStage, { id, abiValidations });
  }
  render() {
    const { abiValidations } = this.props.stage;
    return (
      <div className="validations">
        <CodeEditor mode="json" code={abiValidations} onUpdate={(x) => this.updateValidations(x)} />
      </div>
    )
  }
}

export default Validations;
