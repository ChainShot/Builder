import React, { Component } from 'react';
import CodeEditor from '../CodeEditor';
import ReactMarkdown from 'react-markdown';
import apiMutation from '../../../utils/api/mutation';
import htmlParser from 'react-markdown/plugins/html-parser';
import './MarkdownEdit.scss';
import UpdateWrapper from '../../UpdateWrapper';

const WHITE_LIST = ['www.youtube.com', 'www.youtube-nocookie.com'];

function whitelisted(src) {
  const originHostname = new URL(src).hostname;
  return WHITE_LIST.indexOf(originHostname) >= 0;
}

function whiteListedFrame(node) {
  return node.type === 'tag' && node.name === "iframe" && whitelisted(node.attribs.src);
}

const parseHtml = htmlParser({
  isValidNode: node => whiteListedFrame(node)
})

class MarkdownEdit extends Component {
  render() {
    const { mutation, id, markdownProp, markdown } = this.props;
    const uniqueKey = this.props.id;
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
    return (
      <div className="markdown-edit">
        <CodeEditor mode="markdown" code={markdown} onUpdate={(markdown) => update({ markdown })} />
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
