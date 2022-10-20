import axios from '../../../axios';
import {
    GET_ALL_USERS,
    GET_USER,
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
    GET_USER_EMAIL,
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

export function getUserByEmail(payload) {
    return async function (dispatch) {
        const user = await axios.post(`/users/login`, payload);
        dispatch({ type: GET_USER_EMAIL, payload: user.data });
    };
};

export function addUser(payload) {
    return async function (dispatch) {
        const user = await axios.post('/users', payload);
        dispatch({ type: ADD_USER, payload: user.data })
    };
};

export function editUser(email, payload) {
    return async function (dispatch) {
        const user = await axios.put(`/users/${email}`, payload);
        dispatch({ type: EDIT_USER, payload: user.data })
        await dispatch(getUsers())
    };
};

export function deleteUser(email) {
    return async function (dispatch) {
        await axios.delete(`/users/${email}`);
        dispatch({ type: DELETE_USER })
        await dispatch(getUsers())
    };
};