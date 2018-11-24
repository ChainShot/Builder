import React, {Component} from 'react';
import debounce from '../../utils/debounce';
import MonacoEditor from 'react-monaco-editor';
import theme from '../../utils/monacoTheme';
import './CodeEditor.scss';

let isInitialized = false;

const getInitialized = () => isInitialized;
const setInitialized = () => isInitialized = true;

function getCompletionProvider(monaco) {
    return {
        provideCompletionItems: function (model, position) {
            return [{
                label: 'console.log',
                kind: monaco.languages.CompletionItemKind.Function,
                detail: "Log to ChainShot test results",
                documentation: 'When you console.log a value it will display within the ChainShot test results.',
                insertText: { value: 'console.log($0)' }
            }]
        }
    };
}

const requireConfig = {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
    paths: {
        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs'
    }
};

const defaultMonacoOptions = {
    selectOnLineNumbers: true,
    fontFamily: 'Menlo, Source Code Pro, monospace',
    minimap: {
        enabled: false,
    },
    fontSize: '14px',
    lineHeight: '20px',
    formatOnPaste: true,
    folding: true,
    glyphMargin: false,
    fixedOverflowWidgets: true,
    parameterHints: false,
}

class CodeEditor extends Component {
    constructor(props) {
        super(props);
        this.updateCode = this.updateCode.bind(this);
        this.editorDidMount = this.editorDidMount.bind(this);
        this.updateLayout = this.updateLayout.bind(this);
        this.compileCode = this.compileCode.bind(this);
        this.updateDebounce = debounce(this.updateDebounce, 1000).bind(this);
    }

    updateCode() {
        const {monaco} = this.refs;
        if (monaco && monaco.editor) {
            const currentVal = monaco.editor.getValue();
            if (currentVal !== this.props.code) {
                const {updateCode} = this.props;
                if (updateCode) {
                    updateCode(currentVal);
                }
            }
        }
    }

    compileCode() {
        const {compileCode} = this.props;
        if (compileCode) {
            compileCode();
        }
    }

    updateDebounce() {
        this.updateCode();
        this.compileCode();
    }

    componentDidUpdate(prevProps) {
        // update the layout
        const becameActive = (this.props.active && !prevProps.active);
        const changedHeight = (this.props.height !== prevProps.height);
        if (becameActive || changedHeight) {
            this.updateLayout();
        }
    }

    componentWillReceiveProps(nextProps) {
        const nextCode = nextProps.code;
        const editor = this.refs.monaco.editor;
        if (editor) {
            const currentVal = this.refs.monaco.editor.getValue();
            if (currentVal !== nextCode) {
                this.refs.monaco.editor.setValue(nextCode || "");
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateLayout);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateLayout);
        const { passReference } = this.props;
        if(passReference) {
            passReference(this.refs.monaco);
        }
    }

    updateLayout() {
        const {monaco} = this.refs;
        if (monaco && monaco.editor) {
            monaco.editor.layout();
        }
    }

    editorDidMount(editor, monaco) {
        // HACK: use a monaco singleton to only run this code on monaco once
        // debugger;
        // if(!getInitialized()) {
        //     // remove useless autosuggestions
        //     monaco.languages.typescript.javascriptDefaults.setCompilerOptions({ noLib: true, allowNonTsExtensions: true });
        //     monaco.languages.registerCompletionItemProvider('javascript', getCompletionProvider(monaco));
        //     setInitialized();
        // }
        editor.onDidBlurEditorWidget(this.updateCode);
        // use our custom ChainShot theme
        monaco.editor.defineTheme('chainshotTheme', theme);
        monaco.editor.setTheme('chainshotTheme');
        // fix any layout issues (rendering within container size)
        this.updateLayout();
        // bind CMD + Enter to running code
        const cmdEnter = monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter;
        editor.addCommand(cmdEnter, () => {
            this.updateCode();
            const {runTest} = this.props;
            runTest && runTest();
        });
    }

    render() {
        const classes = ['code-editor'];
        const {active, code, mode, readOnly} = this.props;
        const options = {readOnly, ...defaultMonacoOptions};
        if (!active) classes.push("hidden");
        return (
            <div className={classes.join(' ')}>
                <MonacoEditor
                    ref="monaco"
                    language={mode}
                    value={code}
                    onChange={this.updateDebounce}
                    requireConfig={requireConfig}
                    editorDidMount={this.editorDidMount}
                    options={options}
                />
            </div>
        );
    }
}

export default CodeEditor;
