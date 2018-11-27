import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import ReactMarkdown from 'react-markdown';
import modifyStage from '../../mutations/stage/modify';
import apiMutation from '../../utils/api/mutation';
import './Task.scss';

class Task extends Component {
  updateTask(task) {
    const { id } = this.props.stageContainer;
    apiMutation(modifyStage, { id, task });
  }
  render() {
    const { task } = this.props.stage;
    return (
      <div className="task">
        <CodeEditor mode="markdown" code={task} onUpdate={(x) => this.updateTask(x)} />
        <div className="display">
          <ReactMarkdown source={task} />
        </div>
      </div>
    )
  }
}

export default Task;
