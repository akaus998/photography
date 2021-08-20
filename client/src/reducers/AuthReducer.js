const INITIAL_STATE={
	isSignedIn:null,
	userName:null,
	userEmail:null
};

export default(state=INITIAL_STATE,action)=>{

	switch(action.type){
		case 'SIGN_IN':
		return {...state,isSignedIn:true,userName:action.payload.userName,userEmail:action.payload.userEmail};
		case 'SIGN_OUT':
		return{...state,isSignedIn:false};
		default:
		return state;


	}


};