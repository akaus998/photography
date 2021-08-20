import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
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
		
			
			<StyleRoot><div style={styles.fadeZoom}>
			<div style={{width:'100%',backgroundColor:'black',height:'600px'}} ></div>
		<StyleRoot><div style={styles.flash}><div style={{backgroundColor:'orange',height:'230px',position:'absolute',top:'50%'
		,marginLeft:'30%',width:'400px'}} >hi im sliding</div></div></StyleRoot>
		</div></StyleRoot>
			
		
		<Footer />
		</div>
		);
}

export default AboutUs;