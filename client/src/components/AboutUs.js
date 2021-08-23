import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import SlideShow from './slideshow.js';
import { slideInDown,flash,merge,zoomIn} from 'react-animations';
import Radium, {StyleRoot} from 'radium';
const fadeZoom=merge(slideInDown,zoomIn);
const styles = {
  
  flash:{
  	animation:'y 15s',
  	animationName:Radium.keyframes(flash,'flash')
  },

  fadeZoom:{
  	animation:'x 9s',
  	animationName:Radium.keyframes(fadeZoom,'fadeZoom')
  }
}

const AboutUs=()=>{
	return(
		<div>
		<Header />
		
			
		<div style={{backgroundColor:'black',height:'800px',width:'100%',position:'relative'}}>
    </div>
			<div style={{position:'absolute',top:'32%',left:'2%',width:'100%'}}>
        <SlideShow />
      </div>
		
		<Footer />
		</div>
		);
}

export default AboutUs;