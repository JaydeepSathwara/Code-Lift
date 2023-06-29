import React from 'react';
import './CategoryTag.css';

const CategoryTag = ({text}) => {
  return (
    <p className='categoryTag'>
        {text}
    </p>
  )
}

export default CategoryTag