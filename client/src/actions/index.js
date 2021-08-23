import images from '../apis/images.js';
import history from '../history.js';
export const signIn=(userName,userEmail)=>{
	return{
		type:'SIGN_IN',
		payload:{
			userName:userName,
			userEmail:userEmail}
	};
};

export const signOut=()=>{
	return{
		type:'SIGN_OUT'
	};
};

export const fetchImages=()=>{
	return async (dispatch)=>{
		console.log('coming');
		const response=await images.get('/images');
		console.log(response.data);
		dispatch({type:'FETCH_IMAGES',payload:response.data});
	};
};

export const postImages=(name,uploaderName,uploaderEmail,fileSize,uploadingDate)=>{
	return async (dispatch)=>{
		console.log('im post action');
		console.log(fileSize);
		const src='/images/'+ name;
		console.log(src);
		const response = await images.post('/images',{name:name,src:src,uploaderName:uploaderName,uploaderEmail:uploaderEmail,fileSize:fileSize,
			uploadingDate:uploadingDate});
		console.log(response.data);
		dispatch({type:'POST_IMAGES',payload:response.data});
		history.push('/Galleries');
	};
};

export const postImageReport=(reportType,comments,reportedImageId,imageSrc,uploaderName,reporterName,uploaderEmail)=>{
	return async(dispatch)=>{
		console.log('im posting the reported image');
		const response=await images.post('/reports',{reportType:reportType,comments:comments,
			reportedImageId:reportedImageId,imageSrc:imageSrc,uploaderName:uploaderName,reporterName:reporterName,uploaderEmail:uploaderEmail});
		dispatch({type:'POST_IMAGE_REPORT',payload:response.data});

	};
};

export const getReportedImages=()=>{
	return async (dispatch)=>{
		const response=await images.get('/reports');
		console.log(response.data);
		dispatch({type:'GET_REPORTED_IMAGES',payload:response.data});
	};
};

export const invalidReport=(id)=>{
	return async(dispatch)=>{
		dispatch({type:'INVALID_REPORT',payload:id});
		history.push('/AdminPage');
	};
};

export const validReport=(id)=>{
	return async(dispatch)=>{
		dispatch({type:'VALID_REPORT',payload:id});
		history.push('/AdminPage');
	};
};