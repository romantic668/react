import {FETCH_BUGS,FETCH_BUG, DELETE_BUG, NEW_BUG, SHOW_COMPLETE, SHOW_IN_PROGRESS, EDIT_BUG, EDIT_MODE, CREATE_MODE, FINISH_BUG} from '../actions/types';

const initialState = {
    items: [],
    item: {},
    editbug:{},
    completed: false,
    editmode: false
}

export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_BUGS:
            return {
                ...state,
                items: action.payload
            };
        case FETCH_BUG:
            return {
                ...state,
                editbug: action.payload
            };
        case NEW_BUG:
            return{
                ...state,
                item: action.payload
            }
        case EDIT_BUG:
            return{
                ...state,
                editbug: action.payload
            };
        case FINISH_BUG:
            return{
                ...state,
                editbug: action.payload
            };
        case DELETE_BUG:
            return{
                ...state,
                item: action.payload
            };
        case SHOW_COMPLETE:
            return {
                ...state,
                completed: true
            };
        case SHOW_IN_PROGRESS:
            return {
                ...state,
                completed: false
            };
        case EDIT_MODE:
            return {
                ...state,
                editmode: true
            };
        case CREATE_MODE:
            return {
                ...state,
                editmode: false
            };
        default:
            return state;

    }
}