import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import ArticleList from '../../Components/ArticleList/ArticleList';
import SearchBar from '../../Components/SearchBar/SearchBar.jsx';
import ImageSlider from '../../Components/ImageSlider/ImageSlider.jsx';

const Home = () => {
  return (
    <div>
        <Navbar />
        {/* search component */}
        <SearchBar />
        {/* category */}
        <ImageSlider />
        <ArticleList />
    </div>
  )
}

export default Home