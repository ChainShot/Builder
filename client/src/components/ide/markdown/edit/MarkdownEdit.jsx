import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import apiMutation from 'utils/api/mutation';
import htmlParser from 'react-markdown/plugins/html-parser';
import UpdateWrapper from 'components/UpdateWrapper';
import CodeEditor from 'components/ide/CodeEditor';
import emojiProcessing from './processing/emojiProcessing';
import './MarkdownEdit.scss';

const parseHtml = htmlParser({
  isValidNode: node => node.type !== 'script',
  processingInstructions: [emojiProcessing],
});

class MarkdownEdit extends Component {
  render() {
    const { mutation, id, markdownProp, markdown } = this.props;
    return <UpdateWrapper
              mutation={mutation}
              id={id} key={id} debounceKey={id}
              markdownProp={markdownProp}
              markdown={markdown}
              child={MarkdownEditChild} />
  }
}

class MarkdownEditChild extends Component {
  componentDidMount() {
    const { onSave, mutation, id, markdownProp } = this.props;
    onSave(({ markdown }) => apiMutation(mutation, { id, [markdownProp]: markdown }));
  }
  render() {
    const { markdown, update } = this.props;
    const editorOptions = { quickSuggestions: false }
    return (
      <div className="markdown-edit">
        <CodeEditor mode="markdown"
          code={markdown}
          editorOptions={editorOptions}
          onUpdate={(markdown) => update({ markdown })} />
        <div className="display">
          <ReactMarkdown source={markdown}
                escapeHtml={false}
                astPlugins={[parseHtml]} />
        </div>
      </div>
    )
  }
}

export default MarkdownEdit;
