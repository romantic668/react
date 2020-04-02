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


export const fetchBug = (id) => (
    dispatch,
    getState
) => {
    axios
        .get(`http://localhost:5000/api/bugs/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: FETCH_BUG,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};


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

export const editBug = (bug) => (
    dispatch,
    getState
) => {
    axios
        .put(`http://localhost:5000/api/bugs/${bug.id}`, bug, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: EDIT_BUG,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};


export const finishBug = (id) => (
    dispatch,
    getState
) => {
    axios
        .put('http://localhost:5000/api/bugs/finish/' + id, null, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: FINISH_BUG,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};



export const deleteBug = (id) => (
    dispatch,
    getState
) => {
    axios
        .delete('http://localhost:5000/api/bugs/' + id, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_BUG,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};




