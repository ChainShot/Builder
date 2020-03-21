import React from 'react';
import isMacLike from 'utils/isMacLike';
import info from './info';
import './Emoji.scss';

// sheet & info available here - https://github.com/iamcal/emoji-data
const SHEET_ROWS = 57;
const SHEET_COLUMNS = 57;

const Emoji = ({ shortName }) => {
    const emojiInfo = info.find(x => x.short_name === shortName);

    if(!emojiInfo) {
        console.error(`Emoji not found with shortName '${shortName}'!`);
        return null;
    }

    if(isMacLike) {
        const { unified } = emojiInfo;
        const unicodes = unified.split('-');
        const codePoints = unicodes.map((u) => `0x${u}`);
        return (
            <span>{String.fromCodePoint(...codePoints)}</span>
        );
    }
    else {
        const { sheet_x, sheet_y } = emojiInfo;
        const multiplyX = 100 / (SHEET_COLUMNS - 1);
        const multiplyY = 100 / (SHEET_ROWS - 1);
        const backgroundPosition = `${multiplyX * sheet_x}% ${multiplyY * sheet_y}%`;
        const backgroundSize = `${SHEET_ROWS * 100}% ${SHEET_COLUMNS * 100}%`;
        return (
            <div className="emoji" style={{ backgroundPosition, backgroundSize }}/>
        );
    }
}

export default Emoji;
