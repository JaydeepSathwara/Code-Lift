import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate } from 'react-router-dom';
import "./LoginPage.css";
import axios from 'axios';
import { UserContext } from '../../UserContext';
import Navbar from '../../Components/Navbar/Navbar';


const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function loginSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email, password
      });
      console.log("response", response);
      if (response.data.errorMessage) {
        toast.error(response.data.errorMessage);
      } else {
        toast.success("Successfully Registered");
        setUser(response.data);
        setRedirect(true);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errorMessage) {
        toast.error(error.response.data.errorMessage);
      } else {
        toast.error("Oops... Something Went Wrong!");
      }
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="login-page-container">
      <Navbar />

      <div className="login">
        <div className='left'>
          <img src="https://i.pinimg.com/originals/83/af/0e/83af0ea22f4356a2eeaf4fa03479e704.jpg" alt="Login Image" />
        </div>
        <div className='right'>
          <div className="logo"> <img src="https://mymodernmet.com/wp/wp-content/uploads/archive/S3g2jefH7v501cbGGE7F_tristan_eaton7.jpg" alt="Banner Image" /> </div>
          <div className="text-center mt-4 name"> Login</div>
          <form className="p-3 mt-3" onSubmit={loginSubmit}>
            <div className="form-field">
              <input type="email" name="userEmail" id="userEmail" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div className="form-field">
              <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} id="password" placeholder="Password" />
            </div>
            <button className="btn mt-3">Login</button>
          </form>
          <div className="login-forget-password">
            <Link to={'/password/forget'}><span>Forget password?</span></Link>
          </div>
          <div className="login-signup">
            Don't Have Account ? <Link to={'/signup'}><span>Sign up</span></Link>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default LoginPage