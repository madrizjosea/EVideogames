import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import Rating from '@mui/material/Rating';

export default function AddVideogame() {

    const dispatch = useDispatch();
    
    const [value, setValue] = useState(0)
    const [review, setReview] = useState('');

    function clickHandler(e) {
        setValue(e.target.value);
        console.log(value);
    }

    function changeHandler(e) {
        setReview(e.target.value)
        console.log(review);
    }

    // function submitHandler(e) {
    //     e.preventDefault();
    //     dispatch();
    //     setValue(0);
    //     setReview('');
    // }

    return (
        <div id="containerForm">
             <form id="Form" /*onSubmit={e => submitHandler(e)}*/> 
                <p className="labelForm">Review:</p>

                <Rating
                    name="simple-controlled"
                    value={value}
                    precision={0.5}
                    onChange={(e) => clickHandler(e)}
                />

                <div className="err">
                    <input value={review} type="text" name="review" onChange={(e) => changeHandler(e)} />
                </div>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};


// Rating Component: https://mui.com/material-ui/react-rating/ 