import React from 'react';
import './Article.css';
import CategoryTag from '../CategoryTag/CategoryTag.jsx';
import { Link } from 'react-router-dom';

const Article = ({ article }) => {
  const { id, title, desc, author, authorId, authoerImg, category, coverimg, createdAt } = article;
  const img = `/assets/images/${coverimg}`;
  console.log(img);
  return (
    <div className='article-container'>
      <Link to={`/article/${id}`}>
        <img src={`/assets/images/${coverimg}`} alt="cover Image" className='article-cover' />
        <CategoryTag text={category} />
        <h3>{title}</h3>
        <p className='article-desc'>{desc}</p>
        <footer>
          <div className="article-author">
            <img src={`/assets/images/${coverimg}`} alt="cover Image" className='article-author-img' />
            <div>
              <h6>{author}</h6>
              <p>Published: {createdAt}</p>
            </div>
          </div>
        </footer>
      </Link>
    </div>
  )
}

export default Article