import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './WriteArticle.css';

const WriteArticle = () => {

  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');

  async function saveArticleAsDraft(e) {
    e.preventDefault();
    console.log("Saved as draft");
    return;
  }

  async function submitArticleForReview(e) {
    e.preventDefault();
    console.log("Submit Article For Review");
    return;
  }

  return (
    <div className='write-article-container'>
      <form className="write-article-form" onSubmit={submitArticleForReview}>
        <div className="form-field">
          <input type="text" name="articletitle" id="articletitle" value={articleTitle} onChange={(e) => {setArticleTitle(e.target.value)}} placeholder="Article Title" />
          <input type="textarea"  name="articlecontent" id="articlecontent" value={articleContent} onChange={(e) => {setArticleContent(e.target.value)}} placeholder="Article Content" />
          <textarea
          value={articleContent}
          onChange={(e) => {setArticleContent(e.target.value)}}
          rows={5}
          cols={140}
        />
        </div>
        <button type='submit' className="write-article-btn">Submit For Review</button>
        <button className="write-article-btn" onClick={saveArticleAsDraft}>Save As Draft</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default WriteArticle