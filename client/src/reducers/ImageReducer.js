
import _ from 'lodash';

export default(state={},action)=>{
	switch(action.type){
		case 'FETCH_IMAGES':
		return {...state,..._.mapKeys(action.payload,'id')};
		case 'POST_IMAGES':
		return {...state,[action.payload.id]:action.payload};
		default:
		return state;
	}
}