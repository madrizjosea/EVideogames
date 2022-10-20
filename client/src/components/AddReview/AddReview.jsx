import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import Rating from '@mui/material/Rating';
import { addReview } from '../../redux/actions/reviews/index.js';

function validation(input) {
    let err = {};
    if (!input.content) {
        err.content = 'Can not be empty';
    }
    return err;
}

export default function AddReview() {

    const dispatch = useDispatch();

    const [err, setErr] = useState({});
    const [input, setInput] = useState({
        rating: 0,
        content: '',
    });

    function changeHandler(e) {
        console.log(e.target.value);
        if (e.target.name === 'rating') {
            setInput({
                ...input, [e.target.name]: Number(e.target.value)
            })
        } else {
            setInput({
                ...input, [e.target.name]: e.target.value
            })
        }
        setErr(validation({
            ...input, [e.target.name]: e.target.value
        }))
        console.log(input);
        console.log(err);
    }

    function submitHandler(e) {
        e.preventDefault();
        if (!err.content) {

            alert("Review succesfully added!");

            dispatch(addReview(input));

            setInput({
                rating: 0,
                content: '',
            });
        } else {
            return alert("Make sure all no fields are empty.");
        }
    }

    return (
        <div id="containerForm">
            <form id="Form" onSubmit={e => submitHandler(e)}>
                <p className="labelForm">Review:</p>

                <Rating
                    name="rating"
                    value={input.rating}
                    onChange={(e) => changeHandler(e)}
                />

                <div className="err">
                    <input value={input.content} type="text" name="content" onChange={(e) => changeHandler(e)} />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
};


// Rating Component: https://mui.com/material-ui/react-rating/ 