import axios from '../../../axios';
import {
    GET_USER,
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
} from '../types.js';

export function getUser(id) {
    return async function (dispatch) {
        const user = await axios.get(`/users/${id}`);
        dispatch({ type: GET_USER, payload: user.data });
    };
};

export function addUser(payload) {
    return async function (dispatch) {
        const user = await axios.post('/users', payload);
        dispatch({ type: ADD_USER, payload: user.data })
    };
};

export function editUser(payload) {
    return async function (dispatch) {
        const user = await axios.put(`/users/${id}`, payload);
        dispatch({ type: EDIT_GAME, payload: user.data })
    };
};

export function deleteUser(id) {
    return async function (dispatch) {
        await axios.delete(`/users/${id}`);
        dispatch({ type: DELETE_USER });
    };
}