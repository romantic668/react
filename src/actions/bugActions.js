import {FETCH_BUGS, FETCH_BUG, NEW_BUG, EDIT_BUG, FINISH_BUG } from './types';

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

export function fetchBug(id){
    console.log(id)
    return function(dispatch){
        fetch('http://localhost:5000/api/bugs/'+id)
        .then(res => res.json())
        .then(bug => dispatch({
            type: FETCH_BUG,
            payload: bug
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

export const editBug = bug => dispatch => {
    console.log(bug)
    fetch('http://localhost:5000/api/bugs/'+bug.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bug),
        })
        .then((response) => response.json())
        .then((bug) => dispatch({
            type: EDIT_BUG,
            payload: bug
        }))
        
}

export const finishBug = id => dispatch => {
    fetch('http://localhost:5000/api/bugs/finish/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((response) => response.json())
        .then((bug) => dispatch({
            type: FINISH_BUG,
            payload: bug
        }))
        
}



