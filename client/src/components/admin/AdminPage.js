import React from 'react';
import AdminHeader from './AdminHeader.js';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {getReportedImages,invalidReport,validReport} from '../../actions/index.js';
import AdminReportModal from './modal/AdminReportModal.js';
import Radium, {StyleRoot} from 'radium';
import { flash } from 'react-animations';
const styles = {
	flash: {
		animation: 'y 5s',
		animationName: Radium.keyframes(flash, 'flash')
	}
}

class AdminPage extends React.Component{
	state={onModalLoad:'false',imageSrc:null,uploaderName:null,reportedImageId:null,reporterName:null,
	reportId:null,uploaderEmail:null};

	componentDidMount(){
		this.props.getReportedImages();

	}

	onModalLoad=(imageSrc,uploaderName,reporterName,id,reportedImageId,uploaderEmail)=>{
		this.setState({onModalLoad:'true',imageSrc:imageSrc,uploaderName:uploaderName,
			reporterName:reporterName,reportId:id,reportedImageId:reportedImageId,uploaderEmail:uploaderEmail});
	}

	onInvalidReport=()=>{
		this.props.invalidReport(this.state.reportId);
		this.setState({onModalLoad:'false'});
		console.log('im invalid report');
	}
	onValidReport=()=>{
		const templateId='template_u6v1e8h';
		const serviceId='service_u7t7qge';
		this.props.validReport(this.state.reportedImageId);
		this.props.invalidReport(this.state.reportId);
		this.sendFeedBack(serviceId,templateId,{
			uploaderEmail:this.state.uploaderEmail,uploaderName:this.state.uploaderName

		});
		this.setState({onModalLoad:'false'});
		console.log('im valid report');
	}
	sendFeedBack(serviceId,templateId,variables){
		console.log(variables);
		console.log(window.emailjs);
		window.emailjs.send(serviceId,templateId,variables);
	}
	renderContent(){
		return(
			<React.Fragment>
			<div>
			<button onClick={e=>this.setState({onModalLoad:false})} style={{float:'right'}} class="ui red button"><i class="close icon"></i></button>
			<br/>

			<p style={{color:'grey',fontWeight:'bolder',marginTop:'10%',marginLeft:'34%',fontSize:'22px'}}>REPORT DETAILS</p>
			<div style={{marginTop:'6%',marginLeft:'27%'}}><label style={{fontSize:'15px'}}>Reported By:&nbsp;&nbsp;
			<p style={{display:'inline'}}><b>{this.state.reporterName}</b></p></label></div>
			<div style={{marginTop:'2%',marginLeft:'27%'}}><label style={{fontSize:'15px'}}>Uploaded By:&nbsp;&nbsp;
			<p style={{display:'inline'}}><b>{this.state.uploaderName}</b></p></label></div>
			<div style={{marginTop:'4%',marginLeft:'30%'}}>
			<button onClick={this.onInvalidReport} class="ui yellow button">Revoke</button>
			<button  onClick={this.onValidReport} class="ui red button" style={{marginLeft:'2%'}}>Remove</button>
			</div>
			<div style={{marginTop:'6%',marginLeft:'31%'}}>
			<img alt="loading" src={this.state.imageSrc} style={{width:'180px',height:'180px'}}/>
			</div>
			</div>
			</React.Fragment>

			);
		}
		renderReports(){

			return this.props.reports.map((report)=>{
				return(
				<div>

				<li style={{listStyleType: 'none',fontSize: '16px',width: '20%'}}>{report.reportType}</li>
				<li style={{listStyleType: 'none',fontSize: '16px',width: '20%',marginLeft:'35%',marginTop:'-2%'}}>{report.comments}</li>
				<li style={{listStyleType: 'none',fontSize: '16px',marginLeft:'86%',marginTop:'-2%',width:'30%'}}>{report.reportedImageId}</li>			
				<li style={{listStyleType:'none',marginLeft:'92%',marginTop:'-2.5%'}}><button onClick={e=>this.onModalLoad(report.imageSrc,
					report.uploaderName,report.reporterName,report.id,report.reportedImageId,report.uploaderEmail)} style={{backgroundColor:'khaki'}} class="ui button">
					Details</button></li><br/>


					</div>
					);
				})
			}
			render(){

				return(

				<div>
				<Helmet>
				<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js" integrity="sha384-cn7l7gDp0eyniUwwAZgrzD06kc/tftFf19TOAs2zVinnD/C7E91j9yyk5//jjpt/" crossorigin="anonymous"></script>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous" />
				</Helmet>
				<AdminHeader />

				<ul style={{backgroundColor:'navajowhite'}} class="nav nav-tabs" id="myTab" role="tablist">
				<li style={{marginLeft:'25%'}} class="nav-item" role="presentation">
				<button style={{color:'orange',fontWeight:'bolder',fontSize:'20px'}} class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">PROFILE</button>
				</li>
				<li  style={{marginLeft:'5%'}} class="nav-item" role="presentation">
				<button style={{color:'orange',fontWeight:'bolder',fontSize:'20px'}} class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">REPORTED IMAGES</button>
				</li>
				<li  style={{marginLeft:'5%'}} class="nav-item" role="presentation">
				<button style={{color:'orange',fontWeight:'bolder',fontSize:'20px'}} class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">USERS</button>
				</li>
				</ul>
				<div class="tab-content" id="myTabContent">
				<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
				<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

				{(this.props.reports.length===0)?<div style={{marginTop:'6%',marginLeft:'32%'}}>
				<StyleRoot><div style={styles.flash}>
				<p style={{color:'dodgerblue',fontSize:'30px',fontWeight:'bolder'}}>Currently No Reports Available</p>
				</div></StyleRoot>
				</div>:
				<div>
				<ul style={{display: 'flex',marginLeft: '5%',marginTop: '4%',backgroundColor: 'darkcyan',color: 'black',fontWeight: 'bolder',width: '90%'}}>
				<li style={{listStyleType: 'none',fontSize: '20px',width: '20%'}}>REPORT TYPE</li>
				<li style={{listStyleType: 'none',fontSize: '20px',width: '20%',marginLeft:'16%'}}>COMMENTS</li>
				<li style={{listStyleType: 'none',fontSize: '20px',marginLeft:'18%'}}>REPORTED IMAGE ID</li>

				</ul>

				<ul style={{marginLeft: '5%',marginTop: '-2%',backgroundColor: 'darkcyan',color: 'floralwhite',fontWeight: 'bolder',width: '90%'}}>
				<br/>{this.renderReports()}
				</ul>  	
				{(this.state.onModalLoad==='true')?<AdminReportModal content={this.renderContent()} onDismiss={e=>this.setState({onModalLoad:'false'})}/>:''}
				</div>
			}


			</div>
			<div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"></div>
			</div>
			</div>
			);
		}
	}

	const mapStateToProps=(state)=>{
		return{reports:Object.values(state.reports)};
	}
	export default connect(mapStateToProps,{getReportedImages,invalidReport,validReport})(AdminPage);