import React from 'react';

import spriteSheet from '../assets/charset@3x.png';

const strOrAscii = idx => typeof idx === "string" ? idx.charCodeAt(0) : idx;

const calcSpriteStyle = (idx, scale = 2) => {
    return { 
        backgroundImage: `url(${spriteSheet})`,
        backgroundPosition: `-${((strOrAscii(idx) & 0x0F) + 2) * (8*scale)}px -${(((strOrAscii(idx) & 0xF0) >> 4) + 2) * (8*scale)}px`
    }
};

export const Key = ({ which: [_, normal, normalShift, gr, grShift, ctrl ],  
                      label, coord: [row, col], toggle=false,
                      size = "key100", pressed = false, keyState: {isShift, isGr, isCtrl}, style } = {}) => {
    const theKey = (isCtrl) ? ctrl :
                   (isGr && isShift) ? grShift :
                   (isGr) ? gr :
                   (isShift) ? normalShift :
                   normal;
    const theKeyShift = (isShift) ? 0 : (isGr ? grShift : normalShift);
    const grKey = isGr ? 0 : gr;
    const grShiftKey = isGr ? 0 : grShift;
    const ctrlKey = (isGr | isShift | isCtrl) ? 0 : ctrl;



    return (
        <div style={style} className={`keycap ${pressed ? "pressed" : ""} ${size}`} dataValue={strOrAscii(theKey)} dataRow={row} dataCol={col} dataToggle={toggle ? "toggle" : undefined}>
            {label ? (
                <div className="main label" >{label}</div>
            ) : (<>
                {!(isShift || theKeyShift === theKey) && <div className="shift" style={calcSpriteStyle(theKeyShift, 1)}></div>}
                <div className="main" style={calcSpriteStyle(theKey)}></div>
                <div className="grRow">
                    <div className="gr" style={calcSpriteStyle(grKey, 1)}></div>
                    <div className="grShift" style={calcSpriteStyle(grShiftKey, 1)}></div>
                </div>
                <div className="ctrl" style={calcSpriteStyle(ctrlKey, 1)}></div>
            </>)}
        </div>
    );
};
