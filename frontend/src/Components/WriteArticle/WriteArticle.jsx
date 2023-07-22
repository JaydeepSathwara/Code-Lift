import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './WriteArticle.css';

const WriteArticle = () => {
  return (
    <div className='write-article-container'>
            <form className="write-article-form" onSubmit="">
                <div className="form-field">
                    <input type="name" name="userName" id="userName" value="" onChange="" placeholder="Article Title" />
                </div>
                    <button type='submit' className="write-article-btn">Submit For Review</button>
            </form>
            Want to change your password?<Link to='/'>Reset Password</Link>
            <ToastContainer />
        </div>
  )
}

export default WriteArticle