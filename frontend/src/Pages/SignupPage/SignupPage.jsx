import React, { useContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './SignupPage.css';
import Navbar from '../../Components/Navbar/Navbar';
import validator from 'validator';
import { UserContext } from '../../UserContext';

const SignupPage = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(0);
    const { setUser } = useContext(UserContext);

    if (redirect) {
        return <Navigate to={'/'} />
        // Navigate(-1);
    }
    async function registerUser(e) {
        e.preventDefault();
        if (name === "") {
            toast.error("Please Enter User Name");
            return
        }
        if (email === "") {
            toast.error("Please Enter Email");
            return
        }
        else {
            if (!validator.isEmail(email)) {
                toast.error('Please Enter a Valid Email');
                return;
            }
        }
        if (password === "") {
            toast.error("Please Enter Password");
            return
        }

        try {
            e.preventDefault();
            const response = await axios.post("/signup", {
                name,
                email,
                password,
            });
            if (response.data.errorMessage) {
                toast.error(response.data.errorMessage);
            } else {
                toast.success("Successfully Registered");
                setUser(response.data);
                setTimeout(() => {
                    setRedirect(true);
                  }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errorMessage) {
                toast.error(error.response.data.errorMessage);
            } else {
                toast.error("Oops... Something Went Wrong!");
            }
        }
    }

    return (
        <div className="signup-container">
            <Navbar />

            <div className="login">
                <div className='left'>
                    <img src="https://i.pinimg.com/originals/83/af/0e/83af0ea22f4356a2eeaf4fa03479e704.jpg" alt="Login Image" />
                </div>
                <div className='right'>
                    {/* <div className="logo"> <img src="https://mymodernmet.com/wp/wp-content/uploads/archive/S3g2jefH7v501cbGGE7F_tristan_eaton7.jpg" alt="Banner Image" /> </div> */}
                    <div className="text-center mt-4 name"> <b>Register</b> </div>
                    <form className="p-3 mt-3" onSubmit={registerUser}>
                        <div className="form-field">
                            <input type="text" name="userName" id="userName" value={name} onChange={e => setName(e.target.value)} placeholder="User Name" />
                        </div>
                        <div className="form-field">
                            <input type="email" name="userEmail" id="userEmail" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                        </div>
                        <div className="form-field">
                            <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                        </div>
                        <button className="btn mt-3">Register</button>
                    </form>
                    <div className="login-signup">
                        Already Have Account ? <Link to={'/login'}><span>Log In</span></Link>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default SignupPage