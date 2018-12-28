import React, { Component } from 'react';
import CodeEditor from '../CodeEditor';
import ReactMarkdown from 'react-markdown';
import apiMutation from '../../../utils/api/mutation';
import './MarkdownEdit.scss';
import UpdateService from '../../../redux/services/UpdateService';

class MarkdownEdit extends Component {
  componentWillUnmount() {
    UpdateService.unregister();
  }
  componentDidMount() {
    const { markdownProp, id, mutation, markdown } = this.props;
    UpdateService.register(
      { markdown },
      ({ markdown }) => apiMutation(mutation, { id, [markdownProp]: markdown })
    );
  }
  render() {
    const { markdown } = this.props;
    return (
      <div className="markdown-edit">
        <CodeEditor mode="markdown" code={markdown} onUpdate={(markdown) => UpdateService.onUpdate({ markdown })} />
        <div className="display">
          <ReactMarkdown source={markdown} />
        </div>
      </div>
    )
  }
}

export default MarkdownEdit;
