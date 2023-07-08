import React from 'react';
import ArticleList from '../../Components/ArticleList/ArticleList';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../../Components/Navbar/Navbar';
import './Articles.css';
import { useParams } from 'react-router-dom';

const Articles = () => {
  const { keyword } = useParams();

    async function handleSearchSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("/api/v1/articles", {
                keyword
            });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errorMessage) {
                toast.error(error.response.data.errorMessage);
            } else {
                toast.error("Oops... Something Went Wrong!");
            }
        }
    }

    return (
        <div>
            <Navbar />
            <h1 className='article-header'>Articles</h1>
            <ArticleList />
            <ToastContainer />
        </div>
    )
}

export default Articles