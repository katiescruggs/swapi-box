import React from 'react';
import './ScrollText.css';

const ScrollText = ({film}) => {
  
  const paragraphs = film.crawl.map(paragraph => {
    return <p className="scroll-p">{paragraph}</p>;
  });  

  return (
    <div className="scrolltext-big-container">
      <div className="scrolltext-small-container">
        <h4 className="scroll-h4">{film.episode}</h4>
        <h3 className="scroll-h3">{film.title}</h3>
        {paragraphs}
      </div>
    </div>
  );
}

export default ScrollText;