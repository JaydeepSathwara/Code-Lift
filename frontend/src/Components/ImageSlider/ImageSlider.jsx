import React, { useState, useEffect } from 'react';
import './ImageSlider.css';
import {BsArrowLeftCircleFill} from 'react-icons/bs';
import {BsArrowRightCircleFill} from 'react-icons/bs';

const ImageSlider = () => {
  const images = [
    '/assets/images/SliderImg1.png',
    'assets/images/SliderImg2.png',
    'assets/images/SliderImg3.png',
    'assets/images/SliderImg4.png'
  ];

//   const images = [
//     {
//         img: '/assets/images/SliderImg1.png',
//         link: '/explore'
//     },
//     {
//         img: '/assets/images/SliderImg2.png',
//         link: '/explore'
//     },{
//         img: '/assets/images/SliderImg3.png',
//         link: '/explore'
//     },{
//         img: '/assets/images/SliderImg4.png',
//         link: '/explore'
//     }
//   ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        (prevIndex + 1) % images.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevImage = () => {
    setCurrentImageIndex(prevIndex =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex(prevIndex =>
      (prevIndex + 1) % images.length
    );
  };

  return (
    <div className="image-slider">
      <button className='btn-prev' onClick={goToPrevImage}> <BsArrowLeftCircleFill /> </button>
      <img src={images[currentImageIndex]} alt="Slider Image" />
      <button className='btn-next' onClick={goToNextImage}> <BsArrowRightCircleFill /> </button>
    </div>
  );
}

export default ImageSlider;