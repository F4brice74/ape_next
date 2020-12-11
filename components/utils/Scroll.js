import React, { useState } from 'react';

import Icon from '@iconify/react';
import arrowUpCircleFill from '@iconify/icons-bi/arrow-up-circle-fill';


import './Scroll.scss';


const ScrollArrow = () =>{

  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop)

  return (
    <Icon icon={arrowUpCircleFill} width="4em" className="scrollTop" onClick={scrollTop} style={{height: 50, display: showScroll ? 'flex' : 'none'}}/>
    );
}

export default ScrollArrow;
