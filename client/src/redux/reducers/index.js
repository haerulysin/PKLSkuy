import {combineReducers} from 'redux';
import authReducers from './authReducers';
import errorReducers from './errorReducers';
import userReducers from './userReducers';
import projectListReducers from './projectListReducers';
export default combineReducers({
    auth: authReducers,
    errors: errorReducers,
    userState: userReducers,
    projectListState: projectListReducers, 
});