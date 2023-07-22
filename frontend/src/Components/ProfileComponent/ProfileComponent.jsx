import React, { useContext, useState } from 'react';
import './profilecomponent.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ProfileComponent = () => {

  const [showAddProfileImg, setShowAddProfileImg] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [addedProfileImage, setAddedProfileImage] = useState();
  const [previewImage, setPreviewImage] = useState(null);

  console.log("useruseruseruseruser", user);

  async function addProfileImage(e) {
    e.preventDefault();
    if (!addedProfileImage) {
      toast.error("Please Provide Profile Image");
      return;
    }
    const file = addedProfileImage;
    const data = new FormData();
    data.append('file', file);
    console.log("filenamesfilenames", data);
    try {
      const { data: filenames } = await axios.post('/profile-photo-uploads', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAddedProfileImage(filenames);
      axios.get('/profile').then(({ data }) => {
        setUser(data);
      });
      setShowAddProfileImg(false);
      setPreviewImage(null);
    } catch (error) {
      if (!error.response) {
        toast.error("Please check your internet connection.");
        return;
      }
      toast.error("Oops! Something went wrong");
      return;
    }
  }

  function handleProfilePhotoChange(e) {
    e.preventDefault();
    setAddedProfileImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  async function handleProfilePhotoRemove(e) {
    e.preventDefault();
    try {
      const { data: filenames } = await axios.post('/profile-photo-remove', {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAddedProfileImage(filenames);
      axios.get('/profile').then(({ data }) => {
        setUser(data);
      });
      setShowAddProfileImg(false);
      setPreviewImage(null);
    } catch (error) {
      if (!error.response) {
        toast.error("Please check your internet connection.");
        return;
      }
    }
  }


  return (
    <div className='profilecomponent-container'>
      <div className="left-profile-container">
        <div className="profilecomponent-image">
          {user && user.profile_image !== "default_profile_pic" && user.profile_image !== "" ? (
            <img className='profilecomponent-image-img' src={"http://localhost:8000/uploads/" + user.profile_image} alt="Added Photos" />
          ) :
            (
              <img src="/assets/images/default-profile.png" alt="default profile" />
            )}
          <span className='light-text'>Change Profile Photo</span> <button className='change-profile-btn' onClick={e => (setShowAddProfileImg(true))} >Change Photo</button>
          <div className="details">
            <span>Profile</span>
            <div className="detail">
              {user ? (
                <p>{user.name}</p>
              ) : (
                <p>User Name</p>
              )}
            </div>
            <div className="detail">
              Jaydeepsathwara272@gmail.com
            </div>
          </div>
        </div>
        <Link to='/dashboard/editprofile'><button className='edit-profile-btn'>Edit Profile</button></Link>
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
          <form className="change-profile-form" onSubmit={addProfileImage}>
            {/* The image preview */}
            {previewImage && <img src={previewImage} alt="Preview" className='profile-image-preview' />}
            <div className="close_img" onClick={() => {
              setShowAddProfileImg(false);
              setPreviewImage(null);
            }}>
              &#10060;
            </div>
            <input type="file" className='change-profile-file-input' onChange={handleProfilePhotoChange} />
            <button type='submit' className='change-profile-btn'>Add Profile Photo</button>
            {user.profile_image !== "default_profile_pic" && (
              <div className="remove-profile"><span> Want to remove profile photo </span><button className='remove-profile-btn' onClick={handleProfilePhotoRemove}>Remove Photo</button></div>
            )}
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default ProfileComponent