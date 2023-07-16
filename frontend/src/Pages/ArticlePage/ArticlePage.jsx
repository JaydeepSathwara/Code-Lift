import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar'
import { articles } from '../../articles';
import { Link, useParams } from 'react-router-dom';
import ChipTags from '../../Components/ChipTags/ChipTags.jsx';
import './ArticlePage.css';

const ArticlePage = () => {
  const { id } = useParams();
  const article = articles.find(article => article.id === parseInt(id));
  const [showImg, setShowImg] = useState(0);
  return (
    <div>
      <Navbar />
      <Link to='/' className='article-page-back'><span>&#8592;</span> Go Back</Link>

      {
        article &&
        <div className="article-page-container">
          <header>
            <p className='article-date'>Publised {article.createdAt}</p>
            <h1>{article.title}</h1>
            <div className="article-subCategory">
              {article.subCategory && article.subCategory.map((category, index) => <div><ChipTags key={index} label={category}></ChipTags></div>)}
            </div>
          </header>
          <div className="article-page-img">
            <img src={`/assets/images/${article.coverimg}`} onClick={(e) => setShowImg(1)} alt="cover Image" className='article-author-img' />
          </div>
          <p className='article-page-desc'>{article.desc}</p>
        </div>
      }
      {showImg && (
        <div className="article-page-showImg">
          <div className="close_img" onClick={() => setShowImg('')}>
            &#10060;
          </div>
          <img src={`/assets/images/${article.coverimg}`} alt="Image You Have Clicked On" />
        </div>
      )}
    </div>
  )
};
export default ArticlePage