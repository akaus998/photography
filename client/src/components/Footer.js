import React from 'react';

const Footer=()=>{

	return(
		<div className="footer">
		<div>
		<a href="mailto:dtketharinathan@gmail.com"><i id="fb-icon" class="fa fa-facebook-square"></i></a>
		<a href="mailto:dtketharinathan@gmail.com"><i id="igt-icon"  class="fa fa-twitter"></i></a>
		<a href="mailto:dtketharinathan@gmail.com"><i  id="igt-icon" class="fa fa-envelope"></i></a>
		<a href="mailto:dtketharinathan@gmail.com"><i  id="igt-icon" class="fa fa-instagram"></i></a>
		</div>
		<div style={{marginTop:'2%'}}>
		<a href='mailto:dtketharinathan@gmail.com' id="footer-menus">Home </a>
		<a href='mailto:dtketharinathan@gmail.com' id="footer-sub-menu">Galleries </a>
		<a href='mailto:dtketharinathan@gmail.com' id="footer-sub-menu">About us </a>
		<a href='mailto:dtketharinathan@gmail.com' id="footer-sub-menu">FAQ</a>
		</div>
		<div style={{marginTop:'1%'}}>
		<a href='mailto:dtketharinathan@gmail.com' id="footer-bottom-menu">Contact &emsp; &emsp; |</a>
		<a href='mailto:dtketharinathan@gmail.com' id="footer-bottom-menu-sub">Terms of use &emsp; |</a>
		<a href='mailto:dtketharinathan@gmail.com' id="footer-bottom-menu-sub">Privacy Policy &emsp; |</a>
		</div>
		<div style={{marginTop:'3%',marginLeft:'39%'}}>
		<p style={{color:'grey',letterSpacing:'4px',wordSpacing:'2px',fontSize:'11px'}}>&copy; Copyright.All Rights Reserved.</p>
		</div>
		</div>
		);
	}

	export default Footer;