import React from 'react';
import './ChipTags.css';

const ChipTags = ({label}) => {
    return (
        <p className='chip'>{label}</p>
    )
}

export default ChipTags