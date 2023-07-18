import React, { useContext, useState } from 'react';
import './Navbar.css';
import Announcement from '../Announcement/Announcement.jsx';
import { Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { GrSearch } from 'react-icons/gr';
import { BiSolidRightArrow } from 'react-icons/bi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Navbar() {

  const { user, setUser } = useContext(UserContext);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/index");
    }
  };

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
    <Fragment>
      <Announcement />
      <div className='nav-container'>
        <div className='nav-wrapper'>
          <div className='nav-left'>
            {/* <div className='nav-lang'>
            En
          </div> */}
            {!isHomePage && (
              <div className='nav-search-Container'>
                <form onSubmit={searchSubmitHandler}>
                  <input placeholder='Search' className='nav-search-Input' onChange={(e) => setKeyword(e.target.value)} />
                  <button type="submit"><GrSearch /></button>
                </form>
              </div>
            )}
            {/* <div className='nav-menu-Item mobile-disable btn-explore'>
              <Link className='nav-logo-Container-link explore-btn' to='/explore'>Explore</Link>
            </div> */}
          </div>
          <div className='nav-center'>
            <div className='nav-logo'>
              <Link className='nav-logo-Container-link' to='/'>EcoByteX.</Link>
            </div>
          </div>
          <div className='nav-right'>
            {!user ? (
              <>
                <div className='nav-menu-Item'>
                  <Link className='nav-logo-Container-link' to='/'>Register</Link>
                </div>
                <div className='nav-menu-Item'>
                  <Link className='nav-logo-Container-link' to='/login'>SignIn</Link>
                </div>
              </>
            ) : (
              <div className="profile-section">
                <div className='nav-menu-Item'>
                  <Link className='nav-logo-Container-link' to='/dashboard/profile'><b>{user.name}</b></Link>
                  <div className="nav-profile-dropdown">
                  <Link className='nav-logo-Container-link' to='/dashboard/profile'>Dashboard</Link>
                    <a href="" onClick={logoutUser} >Logout</a>
                  </div>
                </div>
                <Link className='nav-logo-Container-link' to='/saved'><i className="nav-fav-icon fa fa-bookmark" aria-hidden="true"></i></Link>
              </div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </Fragment>
  )
}

export default Navbar