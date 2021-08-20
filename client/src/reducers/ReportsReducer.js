import {postImageReport,getReportedImages,invalidReport,validReport} from '../actions';
import _ from 'lodash';
export default(state={},action)=>{
	switch(action.type){
		case 'POST_IMAGE_REPORT':
		return{...state,[action.payload.id]:action.payload};
		case 'GET_REPORTED_IMAGES':
		return {...state,..._.mapKeys(action.payload,'id')};
		case 'INVALID_REPORT':
		return _.omit(state,action.payload);
		case 'VALID_REPORT':
		return _.omit(state,action.payload);
		default:
		return state;
	}
}