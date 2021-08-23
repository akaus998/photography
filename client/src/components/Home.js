import React from 'react';
import ReactDom from 'react-dom';
import homeBg from '../images/home-bg.jpg';
import logo from '../images/logo.png';
import Modal from './Modal.js';
import '../styles/styles.css';
import { flash } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import Footer from './Footer.js';
import GoogleAuth from './GoogleAuth.js';
import {connect} from 'react-redux';
import history from '../history.js';
import {Link} from 'react-router-dom';

const styles = {
	flash: {
		animation: 'y 3s',
		animationName: Radium.keyframes(flash, 'flash')
	}
}
class Home extends React.Component{
	state={ModalLoad:'false'};
	onsetFocus=(event)=>{
		this.setState({ModalLoad:'true'});
		ReactDom.findDOMNode(this.refs.divFocus).focus();
	}
	

	onModalLoad=(event)=>{
		this.setState({ModalLoad:'true'});


	}
	renderContent(){
		return(
			<React.Fragment>
			<div >
			<p style={{color:'powderblue',fontSize:'17px',fontWeight:'bolder',marginLeft:'32%',marginTop:'5%'}}>
			<i class="fa fa-image" style={{color:'rebeccapurple',fontSize:'25px'}}></i>&ensp;
			To ViEw tHe pHoTos,</p>
			<GoogleAuth />
			<p style={{color:'white',fontSize:'19px',marginLeft:'44%',marginTop:'4%'}}> (OR)</p>
			<form  style={{width:'50%',marginLeft:'34%'}}>
			<label style={{color:'white'}}>Name</label><br /><br/>
			<input  style={{border:'none',borderRadius:'3px'}}  type="text" autocomplete="nope" /><br/><br/>
			<label style={{color:'white'}}>Email id</label><br/><br/>
			<input style={{border:'none',borderRadius:'3px'}} type="email" autocomplete="nope"/><br/><br/>
			<label style={{color:'white'}}>Password</label><br/><br/>
			<input style={{border:'none',borderRadius:'3px'}} type="password" autocomplete="off"/><br /><br/>
			<button class="ui green button">Sign Up</button>
			</form>
			</div>
			</React.Fragment>
			);
	}

	render(){
		return(

			<div>

			<div className="home-bg">
			<img alt="loading" className="homebg-width" src={homeBg} />

			{((this.state.ModalLoad==='true')&&(this.props.isSignedIn === false))?<Modal ref="modal" content={this.renderContent()} onDismiss={e=>this.setState({ModalLoad:'false'})}/>:
			(this.state.ModalLoad=== 'true')&&(this.props.isSignedIn===true)?history.push('/galleries')
			:((this.state.ModalLoad==='true')&&(this.props.isSignedIn===null))?<Modal content={this.renderContent()} onDismiss={e=>this.setState({ModalLoad:'false'})}/>:console.log(this.props.isSignedIn)}
			</div>
			<div  className="home-header">
			<StyleRoot><div style={styles.flash}>
			<img ref="divFocus" tabIndex={1} src={logo} alt="loading" className="logo"/>
			</div></StyleRoot>
			<nav className="navigation-bar">

			<ul style={{display:'flex'}}>
			<li className="navigation-button"><a href="mailto:dtketharinathan@gmail.com" style={{color:'mediumpurple'}} className="navigation-hover">Home</a></li>
			<li className="navigation-button"><div className="dropdown"><a href="mailto:dtketharinathan@gmail.com" style={{color:'mediumpurple'}} className="navigation-hover">Galleries</a>
			<div className="dropdown-content">
			<a onClick={e=>this.onModalLoad(e)}>Wild Life Photography</a>
			<a href="mailto:dtketharinathan@gmail.com">Portrait Photography</a>
			</div>
			</div>
			</li>
			<li className="navigation-button"><Link to='/AboutUs' className="navigation-hover" style={{color:'mediumpurple'}}>About us</Link></li>
			<li className="navigation-button"><button className="contactus-btn">Contact Us</button></li>
			</ul>

			</nav>
			</div>

			<div className="top-caption">
			<p style={{color:'white',textShadow: "4px 3px purple",fontFamily:'cursive',fontSize:'25px',fontWeight:'bolder'}}>AK PHOTOGRAPHY</p>

			</div>
			<div className="bottom-caption">
			<p style={{color:'navajowhite',letterSpaxing:'4px',wordSpacing:'8px',fontSize:'36px',fontFamily:"Brush Script MT,cursive",fontWeight:'bolder'}}>When life gets blurry,  adjust your focus!</p>
			</div>

			<div className="boxes">
			<div onClick={e=>this.onsetFocus(e)} className="home-boxes-wildlife">
			<div  className="boxes-text">WILD LIFE</div>
			</div>
			<div onClick={e=>this.onsetFocus(e)} className="home-boxes-portrait">
			<div className="boxes-text">PORTRAIT</div>
			</div>
			<div onClick={e=>this.onsetFocus(e)} className="home-boxes-marriage">
			<div className="boxes-text">MARRIAGE</div>
			</div>
			<div onClick={e=>this.onsetFocus(e)} className="home-boxes-landscape">
			<div className="boxes-text">LANDSCAPE</div>
			</div>
			</div>

			<Footer />


			</div>
			

			);
		}
	}
	const mapStateToProps=(state)=>{
		return{isSignedIn:state.auth.isSignedIn};
	}
	export default connect(mapStateToProps)(Home);