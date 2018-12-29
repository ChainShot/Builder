import React, { Component } from 'react';
import CodeEditor from '../CodeEditor';
import ReactMarkdown from 'react-markdown';
import apiMutation from '../../../utils/api/mutation';
import './MarkdownEdit.scss';
import UpdateWrapper from '../../UpdateWrapper';

class MarkdownEdit extends Component {
  render() {
    return <UpdateWrapper {...this.props} child={MarkdownEditChild} />
  }
}

class MarkdownEditChild extends Component {
  componentDidMount() {
    const { onSave, mutation, markdown, id, markdownProp } = this.props;
    onSave(({ markdown }) => apiMutation(mutation, { id, [markdownProp]: markdown }));
  }
  render() {
    const { markdown, update } = this.props;
    return (
      <div className="markdown-edit">
        <CodeEditor mode="markdown" code={markdown} onUpdate={(markdown) => update({ markdown })} />
        <div className="display">
          <ReactMarkdown source={markdown} />
        </div>
      </div>
    )
  }
}

export default MarkdownEdit;
