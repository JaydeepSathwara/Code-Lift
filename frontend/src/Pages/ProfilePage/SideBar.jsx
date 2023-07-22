import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SideBar.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../UserContext';

const SideBar = ({ activeLink, setActiveLink, page }) => {
  console.log("activeLink", activeLink);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  function linkClasses(type = null) {
    let classes = 'sidebar-link';
    if (type == page) {
      console.log("activeLink123", activeLink);
      classes += ' sidebar-link-active';
    }
    return classes;
  }

  async function logoutUser(e) {
    e.preventDefault();
    try {
      const response = await axios.post('/logout');
    } catch (error) {
      toast.error("Oops... Something Went Wrong!");
    }
    setUser(null);
    toast.success("Successfully Logout");
    navigate('/');
  }

  return (
    <div className='sidebar-container'>
      <h2 className='sidebar-heading'>Dashboard</h2>
      <nav className='sidebar-nav'>
        <ul className='sidebar-list'>
          <li>
            <Link to='/dashboard/profile' className={linkClasses('profile')}>
              <i className="fa fa-user" aria-hidden="true"></i> Profile
            </Link>
          </li>
          <li>
            <Link to='/dashboard/editprofile' className={linkClasses('editprofile')}>
              <i className="fa fa-cogs" aria-hidden="true"></i>Edit Profile</Link>
          </li>
          <li>
            <Link to='/dashboard/writearticle' className={linkClasses('writearticle')}>
              <i className="fa fa-book" aria-hidden="true"></i>Write Article</Link>
          </li>
          <li>
            <Link to='/dashboard/savedarticles' className={linkClasses('savedarticles')}>
              <i className="fa fa-bookmark" aria-hidden="true"></i>Saved Articles</Link>
          </li>
          <li>
            <Link to='/' className='sidebar-link' onClick={logoutUser}><button className='sidebar-logoutbtn'><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</button></Link>

          </li>
        </ul>
      </nav>
      <ToastContainer />
    </div>
  );
}

export default SideBar;