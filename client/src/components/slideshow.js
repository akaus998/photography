import React from 'react';
import {useEffect,useRef,useState} from 'react';
import '../styles/styles.css';
import home from '../images/aboutus-bg.jpg'
// const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const colors=['../images/home-bg.jpg','../images/aboutus-bg.jpg','../images/home-bg.jpg'];
const delay = 3500;

const SlideShow=()=> {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  function slideShowRender(){
    return colors.map((backgroundColor,index)=>{
      if(index===1){
        return(

          <img className="slide" src={home} key={index} />
          );
      }else if(backgroundColor===2){
        return(
          <img className="slide" src={backgroundColor} key={index} />
          );
      }else{
         return(
         <img className="slide" src={backgroundColor} key={index} />
          );
      }
    })
  }

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {slideShowRender()}
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
export default SlideShow;