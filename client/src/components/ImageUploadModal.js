import React from 'react';
import ReactDom from 'react-dom';
import '../styles/styles.css';
import history from '../history.js';

const ImageUploadModal =(props)=>{
	console.log('hi');
	return ReactDom.createPortal(<div id="outerModal" onClick={props.onDismiss} className="ui dimmer modals visible active">
		<div id="innerimageuploadmodal" onClick={(e)=>e.stopPropagation()} className="ui standard modal visible active">
		<div>{props.content}</div>	
		</div>
		</div>,document.querySelector("#imageuploadmodal"));
	}

	export default ImageUploadModal;