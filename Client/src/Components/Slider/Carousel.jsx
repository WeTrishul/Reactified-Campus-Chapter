import React from 'react';

import { CarouselData } from './CarouselData';
import { useState } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const lastSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const nextSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div>
      <div className='outer-slider-box'>
        <div className='slider'>
          <ChevronLeftIcon className='left-arrow' onClick={lastSlide} />
          <ChevronRightIcon className='right-arrow' onClick={nextSlide} />
          {slides &&
            slides.map((slide, index) => {
              return (
                <div
                  className={index === current ? 'slide-active' : 'slide'}
                  key={index}
                >
                  {index === current && (
                    <img src={slide.image} className='img-image' />
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
