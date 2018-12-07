import React, { Component } from 'react';
import CodeEditor from '../CodeEditor';
import ReactMarkdown from 'react-markdown';
import apiMutation from '../../../utils/api/mutation';
import './MarkdownEdit.scss';

class MarkdownEdit extends Component {
  updateMarkdown(markdown) {
    const { mutation, id, markdownProp } = this.props;
    apiMutation(mutation, { id, [markdownProp]: markdown });
  }
  render() {
    const { markdown } = this.props;
    return (
      <div className="markdown-edit">
        <CodeEditor mode="markdown" code={markdown} onUpdate={(md) => this.updateMarkdown(md)} />
        <div className="display">
          <ReactMarkdown source={markdown} />
        </div>
      </div>
    )
  }
}

export default MarkdownEdit;
