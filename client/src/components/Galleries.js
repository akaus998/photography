import React from 'react';
import GoogleAuth from './GoogleAuth.js';
import landscape from '../images/landscape.jpg';
import {connect} from 'react-redux';
import {fetchImages,postImages,postImageReport} from '../actions';
import ImageViewModal from './ImageViewModal.js';
import ImageUploadModal from './ImageUploadModal.js';
import '../styles/styles.css';
import axios from 'axios';
import Footer from './Footer.js';
import Header from './Header.js';
import ReportModal from './ReportModal.js';


const BASE_URL = 'http://localhost:3001/';
class Galleries extends React.Component{
	
	state={ModalLoad:'false',currentImgSrc:null,previewUrl:null,currentImgName:null,selectedFile:null,
	imageUpload:'false',fileName:null,currentImgId:null,uploaderName:null,
	reportImageModal:'false',currentImgUploader:null,uploaderEmail:null,fileSize:null,currentFileSize:null,
	uploadingDate:null,currentImgUploadedDate:null,reportStatus:'false',searchTerm:null,callSearch:'false'};
	componentDidMount(){
		
		this.props.fetchImages();

	}

	onModalLoad=(event,uploaderEmail,imageSrc,imageName,uploaderName,imageId,fileSize,uploadingDate)=>{
		console.log(imageSrc);
		console.log(uploaderName);
		if((uploaderName==="")||(!uploaderName) ){
			this.setState({currentImgSrc:imageSrc,ModalLoad:'true',
				currentImgName:imageName,uploaderEmail:uploaderEmail,reportStatus:'false',currentImgUploader:'AK_PHOTOGRAPHY',currentImgId:imageId});
		}else{
			this.setState({currentImgSrc:imageSrc,ModalLoad:'true',
				currentImgName:imageName,currentImgUploader:uploaderName,uploaderEmail:uploaderEmail,currentImgId:imageId,currentFileSize:fileSize,
				currentImgUploadedDate:uploadingDate,reportStatus:'false'});
		}

		// console.log(src);
		console.log(this.state.currentImgSrc);

	}
	onImageUpload=(event)=>{
		this.setState({imageUpload:'true'});
	}
	postImageReport=(event)=>{
		event.preventDefault();
		console.log(event.target.reportType.value);
		console.log(event.target.comments.value);
		this.props.postImageReport(event.target.reportType.value,event.target.comments.value,this.state.currentImgId,
			this.state.currentImgSrc,this.state.currentImgUploader,this.props.userName,this.state.uploaderEmail);
		this.setState({reportImageModal:'false',currentImgSrc:null,currentImgId:null,currentImgUploader:null,reportStatus:'true'});
	}
	renderUploadContent(){
		return(
			<React.Fragment>
			<div>
			<button onClick={e=>this.setState({imageUpload:false,selectedFile:null,previewUrl:null})} style={{float:'right'}} class="ui red button"><i class="close icon"></i></button>
			<br />

			<p style={{color:'aquamarine',marginTop:'10%',marginLeft:'25%',fontSize:'22px'}}><i style={{color:'aquamarine',fontSize:'26px'}} class="images icon"></i>Select images to upload</p>
			<label style={{marginLeft:'26%',color:'lightgrey',fontWeight:'bolder'}}>Your Name:</label><br /><br/>
			<input style={{marginLeft:'26%',border:'none',borderRadius:'3px'}} type="text" onChange={e=>this.setState({uploaderName:e.target.value})}/>

			<br /><br/>
			<div><input type="file" id="myfile" name="myfile" onChange={this.onChangeFile} 
			style={{borderRadius:'6px',cursor:'pointer',marginLeft:'25%',fontSize:'20px',padding:'2px'}}/></div><br />
			<div><input type="button" value="Upload" onClick={this.handleUpload} 
			style={{marginLeft:'25%',backgroundColor:'green',cursor:'pointer',border:'2px solid green',fontSize:'18px',borderRadius:'8px',color:'white'}}/></div>
			{this.state.selectedFile!=null?<div style={{width:'100%'}}><p style={{color:'ghostwhite',fontSize:'15px',marginLeft:'25%',marginTop:'6%'}}>Preview:</p><img alt="loading" src={this.state.previewUrl} style={{height:'130px',width:'210px',marginLeft:'25%',marginTop:'2%'}}/></div>:''}
			</div>
			</React.Fragment>

			);
		}

		renderReportContent(){
			return(
			<React.Fragment>
			<div >
			<button onClick={e=>this.setState({reportImageModal:'false'})} style={{float:'right'}} class="ui red button"><i class="close icon"></i></button>
			<br />
			<p style={{color:'grey',fontWeight:'bolder',marginTop:'10%',marginLeft:'33%',fontSize:'26px'}}><i style={{color:'red',fontSize:'26px'}} class="file icon"></i>REPORT IMAGE</p>
			<div style={{marginTop:'6%',marginLeft:'28%'}}>
			<form onSubmit={e=>this.postImageReport(e)}>
			<label style={{fontSize:'15px'}}><b>Reason for report:</b>&nbsp;&nbsp;
			<select name="reportType" style={{display:'inline'}}>
			<option>This offends me</option>
			<option>This is a picture of me</option>
			<option>pornography</option>
			<option>This is my work</option>

			</select></label><br/><br />
			<label style={{fontSize:'15px'}}><b>Comments:</b>&nbsp;&nbsp;
			<input autocomplete="off" name="comments" type="textarea"  style={{display:'inline',height:'30px'}} /><br /><br />
			<input style={{border:'none',borderRadius:'4px',backgroundColor:'green',color:'white'
			,marginLeft:'24%',padding:'5px'}} type="submit" value="Submit"/>
			</label>
			</form>
			<br /><br/>
			<label style={{fontSize:'15px'}}><b>Image to be reported:</b></label><br /><br/>
			<img alt="loading" src={this.state.currentImgSrc} style={{height:'110px',width:'190px'}}/>
			</div>
			</div>
			</React.Fragment>
			);
		}
		onChangeFile = event => {
			var fileSize=(event.target.files[0].size)/1000;
			var uploadedDate= new Date().toLocaleString();
			console.log(uploadedDate);
			if(fileSize>2000){
				alert('file size is high! it should be less than 2 MB');

			}else{
				if(fileSize>1000){
					fileSize=Math.round((fileSize/1000),2)+' MB';
					console.log(fileSize);
				}else{
					fileSize=Math.ceil(fileSize)+' KB';
					console.log(fileSize);
				}
				
				this.setState({previewUrl:URL.createObjectURL(event.target.files[0])});
				this.setState({ selectedFile: event.target.files[0] })
				this.setState({fileName:event.target.files[0].name,fileSize:fileSize,uploadingDate:uploadedDate});
			}
		}

		handleUpload = () => {
			const uploaderName=this.state.uploaderName;
			const uploaderEmail=this.props.userEmail;
			const fileSize=this.state.fileSize;
			const uploadingDate=this.state.uploadingDate;
			const data = new FormData();
			data.append('file',this.state.selectedFile);
			axios.post("http://localhost:8000/upload",data,{

			}).then(res=>{
				console.log(res);
				console.log(res.statusText);
				this.props.postImages(res.data.originalname,uploaderName,uploaderEmail,fileSize,uploadingDate);  	
			})
		}
		onReportImage=(imageSrc,imageId)=>{
			this.setState({ModalLoad:'false',reportImageModal:'true'});
		}
		onSearchSubmit=(event)=>{
			event.preventDefault();
			this.setState({searchTerm:event.target.search.value,callSearch:'true'});
		}
		renderContent(){

			return(
				<React.Fragment>

				<div class="ui placeholder segment">

				<div style={{height:'520px'}} class="ui two column very relaxed stackable grid">

				<div class="column" style={{width:'auto'}}>

				<img src={this.state.currentImgSrc} alt="loading" style={{width:'400px',height:'440px',marginTop:'6%'}}/>
				</div>

				<div class="column" style={{width:'100%',display:'contents'}}>
				<div style={{marginTop:'3%',marginLeft:'7%'}}>
				<div><button onClick={e=>this.setState({ModalLoad:'false',currentImgSrc:null})} style={{marginLeft:'86%'}} class="ui red button"><i class="close icon"></i></button></div>
				<br/>
				<p style={{textAlign:'center',fontSize:'26px',marginTop:'25%'}}>Image Details</p>
				<label style={{fontSize:'15px'}}>Uploaded by:<p style={{display:'inline'}}><b>&nbsp;&nbsp;{this.state.currentImgUploader}</b></p></label><br /><br />
				<label style={{fontSize:'15px'}}>Uploaded Date:<p style={{display:'inline'}}><b>&nbsp;&nbsp;{this.state.currentImgUploadedDate}</b></p></label><br /><br/>
				<label style={{fontSize:'15px'}}>Name:<p style={{display:'inline'}}><b>&nbsp;&nbsp;{this.state.currentImgName}</b></p></label><br /><br/>
				<label style={{fontSize:'15px'}}>Size:<p style={{display:'inline'}}><b>&nbsp;&nbsp;{this.state.currentFileSize}</b></p></label><br />
				<div style={{marginTop:'26%'}}><a href={this.state.currentImgSrc}  download style={{backgroundColor:'green',borderRadius:'5px',padding:'6px',border:'2px solid green',fontWeight:'bolder'}}>
				<i  class="download icon"></i>Download</a></div>
				<div style={{float:'left',marginTop:'12%'}}><button class="ui red button" onClick={this.onReportImage}><i style={{marginLeft:'-28%'}} class="fa fa-file"></i>&nbsp;&nbsp;Report</button></div>
				</div>
				</div>



				</div>

				<div style={{left:'58%'}} class="ui vertical divider">

				</div>

				</div>

				</React.Fragment>
				);
		}
		renderSearchImages(search){
			return this.props.images.map((image)=>{
				if((image.name).includes(search)){
					return(

						<div>
						<img alt="loading" onClick={e=>this.onModalLoad(e,image.uploaderEmail,image.src,image.name,image.uploaderName,image.id,image.fileSize,
							image.uploadingDate)} style={{width:'150px',height:'150px'}} src={image.src} /></div>

						);

					}

				})
			}
			renderImages(){

				return this.props.images.map((image)=>{

					return(

					<div>
					<img alt="loading" onClick={e=>this.onModalLoad(e,image.uploaderEmail,image.src,image.name,image.uploaderName,image.id,image.fileSize,
						image.uploadingDate)} style={{width:'150px',height:'150px',cursor:'pointer'}} src={image.src} /></div>

						);


					})
				}

				render(){
					return(
					<div style={{backgroundColor:'darkgrey'}}>

					<Header/>

					<p style={{marginTop:'7%',marginLeft:'30%',fontSize:'38px',fontFamily:'fantasy',letterSpacing:'5px',textShadow:'9px 2px grey'}}><i style={{color:'purple',textShadow:'none'}} class="camera retro icon"></i>
					&nbsp; WILD LIFE PHOTOGRAPHY</p>
					<form onChange={e=>this.setState({callSearch:'false'})} onSubmit={e=>this.onSearchSubmit(e)}>
					<input name="search" style={{border:'3px solid grey',borderRadius:'3px',height:'35px',marginLeft:'35%'}}type="text" placeholder="search for images eg.marriage,wildlife" size="55" />
					<button style={{backgroundColor:'mediumblue',height:'35px',padding:'8px'}} type="submit"><i class="fa fa-search"></i></button>
					</form>
					{(this.state.reportStatus==='true')?<div><p style={{color:'green',marginLeft:'30%',fontSize:'24px',fontWeight:'bolder'}}>Thanks for your report! We will look into it &nbsp;&nbsp;<i style={{color:'orange',fontWeight:'bolder',fontSize:'35px'}} class="fa fa-smile-o" aria-hidden="true"></i></p></div>:''}
					{((this.state.ModalLoad==='true')&&(this.state.currentImgSrc!=null))?<ImageViewModal content={this.renderContent()} onDismiss={e=>this.setState({ModalLoad:'false',currentImgSrc:null})}/>:''}
					{(this.state.callSearch==='true')?

					<div style={{display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					width: '60%',
					gap: '8px',
					marginLeft:'20%',marginTop:'5%'}}>{this.renderSearchImages(this.state.searchTerm)}
					</div>
					:
					<div style={{display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					width: '60%',
					gap: '8px',
					marginLeft:'20%',marginTop:'5%'}}>{this.renderImages()}
					<div onClick={e=> this.onImageUpload(e)} style={{height:'150px',cursor:'pointer',width:'150px',border:'6px solid grey'}}>
					<i onClick={e=> this.onImageUpload(e)} class="upload icon" style={{color:'green',fontSize:'50px',marginLeft:'28%',marginTop:'40%'}}></i></div></div>
				}





				{(this.state.imageUpload === 'true')?<ImageUploadModal content={this.renderUploadContent()} onDismiss={e=>this.setState({imageUpload:'false'})}/>:'' }
				{(this.state.reportImageModal==='true')?<ReportModal content={this.renderReportContent()} onDismiss={e=>this.setState({reportImageModal:'false'})}/>:''}
				<Footer/>
				</div>
				);
			}
		}

		const mapStateToProps=(state)=>{
			return {images:Object.values(state.Img),userName:state.auth.userName,userEmail:state.auth.userEmail};
		}

		export default connect(mapStateToProps,{fetchImages,postImages,postImageReport})(Galleries);