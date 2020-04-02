import { FETCH_USERS } from './types';

export function fetchUsers() {
    return function (dispatch) {
        fetch('http://localhost:5000/api/users')
            .then(res => res.json())
            .then(users => dispatch({
                type: FETCH_USERS,
                payload: users
            }))
    }
}