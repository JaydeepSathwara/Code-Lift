import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import ArticleList from '../../Components/ArticleList/ArticleList';
import SearchBar from '../../Components/SearchBar/SearchBar.jsx';
import ImageSlider from '../../Components/ImageSlider/ImageSlider.jsx';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const Home = () => {

  const [article, setArticle] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  // useEffect(() => {
  //   try {
  //     const response = axios.post('/login').then(response => {
  //       console.log("Response", response.data);
  //       setArticle(response.data);
  //     })
  //   } catch (error) {
  //     toast.error("Oops... Something Went Wrong!");
  //   }
  // }, [])
 

  return (
    <div>
      <Navbar />
      {/* search component */}
      <SearchBar />
      {/* category */}
      <ImageSlider />
      <ArticleList />
      <ToastContainer />
    </div>
  )
}

export default Home