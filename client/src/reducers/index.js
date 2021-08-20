import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer.js';
import ImageReducer from './ImageReducer.js';
import ReportsReducer from './ReportsReducer.js';
export default combineReducers({
	auth:AuthReducer,
	Img:ImageReducer,
	reports:ReportsReducer	
});