import React from 'react';
import Emoji from './emoji/Emoji';

const emojiProcessing = {
    shouldProcessNode: function (node) {
        return node.type === "tag" && node.name === "emoji";
    },
    processNode: function (node) {
        return <Emoji shortName={node.attribs.id} />
    },
}

export default emojiProcessing;
