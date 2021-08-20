import React from 'react';
import ReactDom from 'react-dom';

import history from '../history.js';

const Modal =(props)=>{
	return ReactDom.createPortal(<div id="outerModal" onClick={props.onDismiss} className="ui dimmer modals visible active">
		<div id="innerModal" onClick={(e)=>e.stopPropagation()} className="ui standard modal visible active">
		<div>{props.content}</div>	
		</div>
		</div>,document.querySelector("#modal"));
	}

	export default Modal;