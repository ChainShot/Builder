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
}

monaco.editor.defineTheme('chainshot', theme);

class CodeEditor extends Component {
    componentDidMount() {
      const {code, mode} = this.props;
      const editor = monaco.editor.create(this.refs.container, {
        ...defaultMonacoOptions,
        value: code,
        language: mode,
        theme: "chainshot",
      });
      const debouncedUpdate = debounce(() => {
        this.props.onUpdate(editor.getValue());
      }, 1000);
      editor.onDidChangeModelContent(debouncedUpdate);
      this.editor = editor;
    }

    componentDidUpdate(prevProps) {
      if(prevProps.code !== this.props.code) {
        this.editor.setValue(this.props.code);
      }
    }

    render() {
        return <div className="code-editor" ref="container" />
    }
}

export default CodeEditor;
