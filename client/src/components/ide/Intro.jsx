import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import ReactMarkdown from 'react-markdown';
import modifyStageContainer from '../../mutations/stageContainer/modify';
import apiMutation from '../../utils/api/mutation';
import './Intro.scss';

class Intro extends Component {
  updateIntro(intro) {
    const { id } = this.props.stageContainer;
    apiMutation(modifyStageContainer, { id, intro });
  }
  render() {
    const { intro } = this.props.stageContainer;
    return (
      <div className="intro">
        <CodeEditor mode="markdown" code={intro} onUpdate={(intro) => this.updateIntro(intro)} />
        <div className="display">
          <ReactMarkdown source={intro} />
        </div>
      </div>
    )
  }
}

export default Intro;
