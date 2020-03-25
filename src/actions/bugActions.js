import {FETCH_BUGS, NEW_BUG } from './types';

export function fetchBugs(){
    return function(dispatch){
        fetch('http://localhost:5000/api/bugs')
        .then(res => res.json())
        .then(bugs => dispatch({
            type: FETCH_BUGS,
            payload: bugs
        }))
    }
}

export const createBug = bug => dispatch => {
    fetch('http://localhost:5000/api/bugs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bug),
        })
        .then((response) => response.json())
        .then((bug) => dispatch({
            type: NEW_BUG,
            payload: bug
        }))
        
}



