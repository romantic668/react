import { combineReducers } from 'redux';
import bugReducer from './bugReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    bugs: bugReducer,
    users: userReducer,
    error: errorReducer,
    auth: authReducer
})