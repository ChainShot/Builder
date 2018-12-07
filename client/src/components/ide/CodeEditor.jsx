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

class CodeEditor extends Component {
  componentDidMount() {
    const {code, mode} = this.props;
    const editor = monaco.editor.create(this.refs.container, {
      ...defaultMonacoOptions,
      value: code,
      language: mode,
    });
    const debouncedUpdate = debounce(() => {
      this.props.onUpdate(editor.getValue());
    }, 1000);
    editor.onDidChangeModelContent(debouncedUpdate);
    this.editor = editor;

    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    this.editor.layout();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidUpdate(prevProps) {
    if(prevProps.mode !== this.props.mode) {
      monaco.editor.setModelLanguage(this.editor.getModel(), this.props.mode);
    }
    if(prevProps.code !== this.props.code) {
      // if the editor has focus, dont change the content
      // the idea here is we'll accept socket changes from a new tab, window or local IDE
      // since were concerned only with changes from one person editing the content
      // they should not be able to mantain focus on multiple editors at once
      // (there is a small latency period where they can switch quickly and this will reject changes)
      if(!this.editor.hasWidgetFocus()) {
        this.editor.setValue(this.props.code);
      }
    }
  }

  render() {
      return <div className="code-editor" ref="container" />
  }
}

export default CodeEditor;
