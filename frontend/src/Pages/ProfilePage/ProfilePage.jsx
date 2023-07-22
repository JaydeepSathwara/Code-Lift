import React, { Fragment, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from './SideBar.jsx';
import './ProfilePage.css';
import ProfileComponent from '../../Components/ProfileComponent/ProfileComponent.jsx';
import EditProfileComponent from '../../Components/EditProfileComponent/EditProfileComponent.jsx';
import WriteArticle from '../../Components/WriteArticle/WriteArticle.jsx';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {

  let { page } = useParams();
  const [activeLink, setActiveLink] = useState("profile")

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-sidebar">
          <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} page={page} />
        </div>
        <div className="">
          {page === 'profile' && (
            <div className="content">
          <ProfileComponent />
            </div>
          )}
          {page === 'editprofile' && (
            <div className="content">
          <EditProfileComponent />
            </div>
          )}
          {page === 'writearticle' && (
            <div className="content">
          <WriteArticle />
            </div>
          )}
          {page === 'savedarticles' && (
            <div className="content">
          <ProfileComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage