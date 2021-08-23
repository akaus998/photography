import React from 'react';
import ReactDom from 'react-dom';
import '../styles/styles.css';

const ImageViewModal =(props)=>{
	console.log('hi');
	return ReactDom.createPortal(<div id="outerModal" onClick={props.onDismiss} className="ui dimmer modals visible active">
		<div id="innerimagemodal" onClick={(e)=>e.stopPropagation()} className="ui standard modal visible active">
		<div>{props.content}</div>	
		</div>
		</div>,document.querySelector("#imageviewmodal"));
	}

	export default ImageViewModal;