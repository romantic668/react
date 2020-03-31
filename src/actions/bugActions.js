import { FETCH_BUGS, FETCH_BUG, NEW_BUG, EDIT_BUG, FINISH_BUG, DELETE_BUG } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import axios from 'axios';


export function fetchBugs() {
    return function (dispatch) {
        fetch('http://localhost:5000/api/bugs')
            .then(res => res.json())
            .then(bugs => dispatch({
                type: FETCH_BUGS,
                payload: bugs
            })).catch(err =>
                dispatch(returnErrors(err.response.data, err.response.status))
            );
    }
}

export function fetchBug(id) {
    console.log(id)
    return function (dispatch) {
        fetch('http://localhost:5000/api/bugs/' + id)
            .then(res => res.json())
            .then(bug => dispatch({
                type: FETCH_BUG,
                payload: bug
            })).catch(err =>
                dispatch(returnErrors(err.response.data, err.response.status))
            );
    }
}


export const createBug = (bug) => (
    dispatch,
    getState
) => {
    axios
        .post('http://localhost:5000/api/bugs', bug, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: NEW_BUG,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const editBug = bug => (dispatch, getState) => {
    console.log(bug)
    fetch('http://localhost:5000/api/bugs/' + bug.id, {
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

export const finishBug = id => (dispatch, getState) => {
    fetch('http://localhost:5000/api/bugs/finish/' + id, {
        method: 'PUT',
    })
        .then((response) => response.json())
        .then((bug) => dispatch({
            type: FINISH_BUG,
            payload: bug
        }))

}

export const deleteBug = id => (dispatch, getState) => {
    fetch('http://localhost:5000/api/bugs/' + id, {
        method: 'DELETE',


    })
        .then((response) => response.json())
        .then((bug) => dispatch({
            type: DELETE_BUG,
            payload: bug
        }))

}



