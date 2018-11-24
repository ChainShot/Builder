export default {
    base: 'vs-dark', // can also be vs-dark or hc-black
    inherit: true, // can also be false to completely replace the builtin rules
    rules: [
        { token: '', foreground: 'D4D4D4', background: '12151E' },
        { token: 'invalid', foreground: 'f44747' },
        { token: 'emphasis', fontStyle: 'italic' },
        { token: 'strong', fontStyle: 'bold' },

        { token: 'variable', foreground: '74B0DF' },
        { token: 'variable.predefined', foreground: '4864AA' },
        { token: 'variable.parameter', foreground: '9CDCFE' },
        { token: 'constant', foreground: '569CD6' },
        { token: 'comment', foreground: '626466' },
        { token: 'number', foreground: 'c68a19' },
        { token: 'number.hex', foreground: '5BB498' },
        { token: 'regexp', foreground: 'B46695' },
        { token: 'annotation', foreground: 'cc6666' },
        { token: 'type', foreground: '3DC9B0' },

        { token: 'delimiter', foreground: 'DCDCDC' },

        { token: 'key', foreground: '9CDCFE' },
        { token: 'string.key.json', foreground: '569CD6' },
        { token: 'string.value.json', foreground: 'c68a19' },

        { token: 'attribute.name', foreground: '9CDCFE' },
        { token: 'attribute.value', foreground: 'CE9178' },

        { token: 'identifier', foreground: 'A3B7CD' },

        { token: 'string', foreground: 'c68a19' },

        { token: 'keyword', foreground: '569CD6' },
        { token: 'keyword.json', foreground: 'c68a19' },
    ],
    colors: {
        'editor.background': '#12151E',
    }
}
