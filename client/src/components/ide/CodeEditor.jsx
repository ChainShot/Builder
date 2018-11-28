import React, {Component} from 'react';
import debounce from '../../utils/debounce';
import * as monaco from 'monaco-editor'
import theme from '../../utils/monacoTheme';
import './CodeEditor.scss';

const defaultMonacoOptions = {
    selectOnLineNumbers: true,
    fontFamily: 'Menlo, Source Code Pro, monospace',
    minimap: {
        enabled: false,
    },
    wordWrap: "on",
    fontSize: '14px',
    lineHeight: '20px',
    formatOnPaste: true,
    folding: true,
    glyphMargin: false,
    fixedOverflowWidgets: true,
    parameterHints: false,
    theme: "chainshot",
}

monaco.editor.defineTheme('chainshot', theme);

// a half second buffer to help handle synchronizing issues
// a mutation to the server should return a socket update in less time
// meanwhile multiple saves should be at least this far apart
const buffer = .5 * 1000;

class CodeEditor extends Component {
  state = {
    lastEdit: null
  }
  componentDidMount() {
    const {code, mode} = this.props;
    const editor = monaco.editor.create(this.refs.container, {
      ...defaultMonacoOptions,
      value: code,
      language: mode,
    });
    const debouncedUpdate = debounce(() => {
      this.setState({ lastEdit: Date.now() });
      this.props.onUpdate(editor.getValue());
    }, 1000);
    editor.onDidChangeModelContent(debouncedUpdate);
    this.editor = editor;
  }

  componentDidUpdate(prevProps) {
    const { lastEdit } = this.state;
    const sinceEdit = Date.now() - lastEdit;
    if(prevProps.code !== this.props.code && sinceEdit > buffer) {
      this.editor.setValue(this.props.code);
    }
  }

  render() {
      return <div className="code-editor" ref="container" />
  }
}

export default CodeEditor;
