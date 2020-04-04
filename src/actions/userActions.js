import { FETCH_USERS } from './types';

export function fetchUsers() {
    return function (dispatch) {
        fetch('/api/users')
            .then(res => res.json())
            .then(users => dispatch({
                type: FETCH_USERS,
                payload: users
            }))
    }
}