import axios from '../../../axios';
import {
    GET_USER,
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
} from '../types.js';

//GET_USER

export function addUser(payload) {
    return async function (dispatch) {
        const user = await axios.post('/users', payload);
        dispatch({ type: ADD_USER, payload: user.data })
    };
};

//EDIT_USER
//DELETE_USER