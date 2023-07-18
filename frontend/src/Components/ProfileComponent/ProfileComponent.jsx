import React, { useState } from 'react';
import './profilecomponent.css';

const ProfileComponent = () => {

  const [showAddProfileImg, setShowAddProfileImg] = useState(false);

  return (
    <div className='profilecomponent-container'>
      <div className="left-profile-container">
      <div className="profilecomponent-image">
        <img src="/assets/images/default-profile.png" alt="" />
        Change Profile Photo <button className='change-profile-btn' onClick={e => (setShowAddProfileImg(true))} >Add img</button>
      </div>
      </div>
      <div className="right-profile-container">
        <div className="right-top-profile">
        asjdnaksdhnA
        </div>
        <div className="right-bottom-profile">
        asjdnaksdhnA
        </div>
      </div>
      {showAddProfileImg && (
        <div className="add-profile-img-popup">
          <form action="" className="change-profile-form">
          <div className="close_img" onClick={() => setShowAddProfileImg('')}>
            &#10060;
          </div>
          <i className="fa fa-upload" aria-hidden="true"></i>
            Upload
          <input type="file" className='change-profile-file-input'  required/>
            <button type='submit' className='change-profile-btn'>Add Image</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default ProfileComponent