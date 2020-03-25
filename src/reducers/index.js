import { combineReducers } from 'redux';
import bugReducer from './bugReducer';
import userReducer from './userReducer';

export default combineReducers({
    bugs: bugReducer,
    users: userReducer
})