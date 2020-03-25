import {FETCH_BUGS, NEW_BUG, SHOW_COMPLETE, SHOW_IN_PROGRESS} from '../actions/types';

const initialState = {
    items: [],
    item: {},
    completed: false
}

export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_BUGS:
            return {
                ...state,
                items: action.payload
            };
        case NEW_BUG:
            return{
                ...state,
                item: action.payload
            }
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
        default:
            return state;

    }
}