import React from 'react';
import { useState } from 'react';
import './ArticleList.css';
import Article from './Article.jsx';
import { articles } from '../../articles.js';

const ArticleList = () => {

    return (
        <div className='article-list-container'>
            {articles && articles.map(article => (
                <Article article={article} key={article.id} />
            ))}
        </div>
    )
}

export default ArticleList