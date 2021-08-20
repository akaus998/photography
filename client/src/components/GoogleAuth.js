import React from 'react';
import history from '../history.js';
import {signIn,signOut} from '../actions';
import {connect} from 'react-redux';

class GoogleAuth extends React.Component{
	
	componentDidMount(){
		window.gapi.load('client:auth2',()=>{
			window.gapi.client.init(
			{
				clientId:'493079056888-sr86pbhif9s0e0k075705afe00e6eoo2.apps.googleusercontent.com',
				scope: 'email profile'
			}).then(()=>{
				this.auth=window.gapi.auth2.getAuthInstance();
				console.log(this.auth.currentUser.get().getBasicProfile().getName());
				this.onAuthChange(this.auth.isSignedIn.get());
				this.auth.isSignedIn.listen(this.onAuthChange);

			});
		});

	}

	onAuthChange=(isSignedIn)=>{
		if(isSignedIn){
			this.props.signIn(this.auth.currentUser.get().getBasicProfile().getName(),
				this.auth.currentUser.get().getBasicProfile().getEmail());
		}else{
			this.props.signOut();
		}
	};

	onSignIn=(userName)=>{
		this.auth.signIn().then((response)=>{
			console.log(response.Os.Ne);
			if( response.Os.Ne=== 'PICTURE PATCHY'){
				history.push('/AdminPage');
			}else{
				history.push('/Galleries');
			}
		});
		
		
		
	};


	onSignOut=()=>{
		this.auth.signOut().then(()=>history.push('/'));
	};

	renderAuthButton(){
		if(this.props.isSignedIn === null){
			return (<button onClick={e=>this.onSignIn(this.props.userName)} style={{marginLeft:'34%',marginTop:'2%'}} class="ui google plus button">
				<i class="google plus icon"></i>
				Sign in With Google
				</button>
				);
		}else if(this.props.isSignedIn){
			
			return(
				<button onClick={this.onSignOut} class="ui red google button">
				<i class="google plus icon"></i>Sign Out</button>

				);

		}else{
			return(<button onClick={e=>this.onSignIn(this.props.userName)} style={{marginLeft:'34%',marginTop:'2%'}} class="ui google plus button">
				<i class="google plus icon"></i>
				Sign in With Google
				</button>
				);
		}
	}

	render(){
		return(
			<div>{this.renderAuthButton()}</div>
			);
		}
	}

	const mapStateToProps=(state)=>{
		return{isSignedIn:state.auth.isSignedIn,userName:state.auth.userName};
	}

	export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);