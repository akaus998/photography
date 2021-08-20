import React from 'react';
import {Link} from 'react-router-dom';
import Radium, {StyleRoot} from 'radium';
import logo from '../images/logo.png';
import { flash } from 'react-animations';
import GoogleAuth from './GoogleAuth.js';

import {connect} from 'react-redux';
const styles = {
	flash: {
		animation: 'y 3s',
		animationName: Radium.keyframes(flash, 'flash')
	}
}


class Header extends React.Component{
	render(){
		return(
			<div>
			<div style={{height:'110px',backgroundImage:'linear-gradient(to right,black ,rgb(30, 18, 40) 70%,rgb(30, 16, 42) )'}}>
			<StyleRoot><div style={styles.flash}>
			<img alt="loading" src={logo} style={{width: '75px', height: '60px',float: 'left',marginTop: '1.5%',
			marginLeft: '1%'}}/><p style={{
				color:'rebeccapurple',marginLeft: '8%',paddingTop: '35px',fontSize: '25px',textShadow: '2px 1px paleturquoise',fontWeight: 'bolder'}}>{this.props.userName}</p>
				</div></StyleRoot>
				<nav>

				<ul style={{display:'flex',marginLeft:'50%',marginTop:'-4.5%'}}>
				<li style={{paddingRight: '45px' ,fontWeight: 'bolder',fontSize: '18px',listStyleType: 'none',marginTop: '6%'}}><Link to='/' style={{color:'mediumpurple',textDecorationLine:'none'}} className="navigation-hover">Home</Link></li>
				<li style={{paddingRight: '45px' ,fontWeight: 'bolder',fontSize: '18px',listStyleType: 'none',marginTop: '6%'}}><div className="dropdown"><a style={{color:'mediumpurple',textDecorationLine:'none'}} className="navigation-hover">Galleries</a>
				<div className="dropdown-content">
				<a onClick={e=>this.onModalLoad(e)}>Wild Life Photography</a>
				<a href="">Portrait Photography</a>
				</div>
				</div>
				</li>
				<li style={{paddingRight: '45px' ,fontWeight: 'bolder',fontSize: '18px',listStyleType: 'none',marginTop: '6%'}}><a className="navigation-hover" style={{color:'mediumpurple',textDecorationLine:'none'}}>About us</a></li>
				<li style={{paddingRight: '45px' ,fontWeight: 'bolder',fontSize: '18px',listStyleType: 'none',marginTop: '5%'}}><button className="contactus-btn">Contact Us</button></li>
				<div style={{marginTop:'4.5%'}}><GoogleAuth /></div>
				</ul>

				</nav>

				</div>
				</div>
				);
			}
		}
		const mapStateToProps=(state)=>{
			return{userName:state.auth.userName};
		}
		export default connect(mapStateToProps)(Header);