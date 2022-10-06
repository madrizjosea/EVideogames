import axios from '../../../axios';
import {
    GET_ALL_USERS,
    GET_USER,
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
} from '../types.js';

export function getUsers() {
    return async function (dispatch) {
        const users = await axios.get('/users');
        dispatch({ type: GET_ALL_USERS, payload: users.data });
    };
};

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

export function editUser(id, payload) {
    return async function (dispatch) {
        const user = await axios.put(`/users/${id}`, payload);
        dispatch({ type: EDIT_USER, payload: user.data })
    };
};

export function deleteUser(id) {
    return async function (dispatch) {
        await axios.delete(`/users/${id}`);
        dispatch({ type: DELETE_USER });
    };
};