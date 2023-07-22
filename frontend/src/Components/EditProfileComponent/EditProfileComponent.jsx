import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import './EditProfileComponent.css';
import axios from 'axios';
import { UserContext } from '../../UserContext';

const EditProfileComponent = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { user, setUser, isLoading } = useContext(UserContext);
    var UserContext_Userid = '';
    var UserContext_Email = '';
    useEffect(() => {
        if (user) {
            setName(user.name);
            UserContext_Userid = user.id;
            UserContext_Email = user.email;
        }
    }, [user]);
    const [redirect, setRedirect] = useState(0);

    async function EditProfileSubmit(e) {
        e.preventDefault();
        if (name === "") {
            toast.error("Please Enter User Name");
            return
        }

        try {
            e.preventDefault();
            const response = await axios.post("/edit-profile", {
                name,
                id: UserContext_Userid,
                email: UserContext_Email
            })
            console.log("asdasdasdasd", response);
            if (response.data.errorMessage) {
                toast.error(response.data.errorMessage);
            } else {
                toast.success("Successfully Updated");
                console.log("aaaaaAAAAAAAAA", response.data);
                setUser(response.data);
                // console.log("response.data",response.data);
                // axios.get('/profile').then(({ data }) => {
                //     setUser(data);
                //     console.log("asdadasdDatalelo: ", data);
                // });
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
        <div className='edit-profile-container'>
            <form className="edit-profile-form" onSubmit={EditProfileSubmit}>
                <div className="form-field">
                    <input type="name" name="userName" id="userName" value={name} onChange={e => setName(e.target.value)} placeholder="User Name" />
                </div>
                {user && !isLoading ? (
                    <button type='submit' className="edit-profile-btn">Edit Profile</button>
                ) : (
                    <button type='submit' className="edit-profile-btn" disabled>Edit Profile disable</button>
                )}
            </form>
            Want to change your password?<Link to='/'>Reset Password</Link>
            <ToastContainer />
        </div>
    )
}

export default EditProfileComponent