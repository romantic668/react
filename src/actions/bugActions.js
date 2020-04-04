import { FETCH_BUGS, FETCH_BUG, NEW_BUG, EDIT_BUG, FINISH_BUG, DELETE_BUG } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import axios from 'axios';


export function fetchBugs() {
    return function (dispatch) {
        fetch('/api/bugs')
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
        .get(`/api/bugs/${id}`, tokenConfig(getState))
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
        .post('/api/bugs', bug, tokenConfig(getState))
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
        .put(`/api/bugs/${bug.id}`, bug, tokenConfig(getState))
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
        .put('/api/bugs/finish/' + id, null, tokenConfig(getState))
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
        .delete('/api/bugs/' + id, tokenConfig(getState))
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




