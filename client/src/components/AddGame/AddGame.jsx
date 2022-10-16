import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addGame } from '../../redux/actions/games/index.js';

function validation(input) {
    let err = {};
    if (!input.name) {
        err.name = 'Can not be empty';
    } else if (input.name.length > 25) {
        err.name = 'Should contain less than 25 characters';
    }

    if (!input.description) {
        err.description = 'Can not be empty.';
    }

    if (!input.image) {
        err.image = 'Can not be empty.';
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(input.image)) {
        err.image = 'Should be a valid image url.';
    }

    if (!input.releaseDate) {
        err.releaseDate = 'Can not be empty.';
    } else if (!/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(input.releaseDate)) {
        err.releaseDate = 'Should be a valid date(yyyy-mm-dd).';
    }

    if (!input.rating) {
        err.rating = 'Can not be empty.';
    } else if (!/^[0-9]+$/.test(input.rating)) {
        err.rating = 'Should only contain numbers.';
    } else if (!/^(?=.*[1-5])\d+(?:\.[05]0?)?$/.test(input.rating)) {
        err.rating = 'Should be between 1 and 5(only 0.5 decimals are valid).';
    }

    return err;
}

export default function AddVideogame() {

    const dispatch = useDispatch();

    const [err, setErr] = useState({});
    const [input, setInput] = useState({
        name: '',
        description: '',
        image: '',
        releaseDate: '',
        rating: '',
        audiences: [],
        genres: [],
    });

    function changeHandler(e) {
        setInput({
            ...input, [e.target.name]: e.target.value
        })
        setErr(validation({
            ...input, [e.target.name]: e.target.value
        }))
        console.log(input);
        console.log(err);
    }

    function audiencetHandler(e) {
        setInput({
            ...input, 
            audiences: [e.target.value]
        })
        console.log(input);
    }

    function genreHandler(e) {
        if (input.genres?.length >= 3) {
            alert('You can only select up to 3 genres.');
        } else if (input.genres?.includes(e.target.value)) {
            alert('You already chose this genre.');
        } else {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
        }
        e.target.value = 'default';
        console.log(input.genres);
        console.log(err.genres);
    }

    function deleteHandler(e) {
        e.preventDefault();
        console.log(e.target.value);
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== e.target.value)
        });
    }

    function submitHandler(e) {
        e.preventDefault();
        if (!err.name &&
            !err.description &&
            !err.image &&
            !err.releaseDate &&
            !err.rating) {

            alert("New Game has been succesfully added!");

            dispatch(addGame(input));

            setInput({
                name: '',
                description: '',
                image: '',
                releaseDate: '',
                rating: '',
                audiences: [],
                genres: [],
            });
        } else {
            return alert("Make sure all the fields are correct.");
        }
    }

    return (

        <div id="containerForm">
            <form id="Form" onSubmit={e => submitHandler(e)}>

                <h1>New Videogame</h1>

                <div>
                    <p className="labelForm">Name:</p>

                    <div>
                        <input value={input.name} type="text" name="name" onChange={(e) => changeHandler(e)} />
                    </div>
                    {err.name &&
                        <span className="error">{err.name}</span>
                    }
                </div>

                <div>
                    <p className="labelForm">Description:</p>

                    <div>
                        <input value={input.description} type="text" name="description" onChange={(e) => changeHandler(e)} />
                    </div>
                    {err.description &&
                        <span className="error">{err.description}</span>
                    }
                </div>

                <div>
                    <p className="labelForm">Image:</p>

                    <div>
                        <input value={input.image} type="text" name="image" onChange={(e) => changeHandler(e)} />
                    </div>
                    {err.image &&
                        <span className="error">{err.image}</span>
                    }
                </div>

                <div>
                    <p className="labelForm">Release Date:</p>

                    <div>
                        <input value={input.releaseDate} type="text" name="releaseDate" onChange={(e) => changeHandler(e)} />
                    </div>
                    {err.releaseDate &&
                        <span className="error">{err.releaseDate}</span>
                    }
                </div>

                <div>
                    <p className="labelForm">Rating:</p>

                    <div >
                        <input value={input.rating} type="text" name="rating" onChange={(e) => changeHandler(e)} />
                    </div>
                    {err.rating &&
                        <span className="error">{err.rating}</span>
                    }
                </div>


                <div id="audiences">
                    <div>
                        <p>Audiences:</p>

                        <select className="input" onChange={(e) => audiencetHandler(e)} defaultValue='default'>
                            <option value='default' disabled='default' hidden>Select Audiences</option>
                            <option>Teen</option>
                            <option>Everyone</option>
                            <option>Everyone 10+</option>
                            <option>Mature</option>
                            <option>Adults Only</option>
                        </select>
                    </div>
                </div>

                <div id="genres">
                    <div>
                        <p>Genres:</p>

                        <select className="input" onChange={(e) => genreHandler(e)} defaultValue='default'>
                            <option value='default' disabled='default' hidden>Select Genres</option>
                            <option>Action</option>
                            <option>Indie</option>
                            <option>Adventure</option>
                            <option>RPG</option>
                            <option>Strategy</option>
                            <option>Shooter</option>
                            <option>Casual</option>
                            <option>Simulation</option>
                            <option>Puzzle</option>
                            <option>Arcade</option>
                            <option>Platformer</option>
                            <option>Racing</option>
                            <option>Massively Multiplayer</option>
                            <option>Sports</option>
                            <option>Fighting</option>
                            <option>Family</option>
                            <option>Board Games</option>
                            <option>Educational</option>
                            <option>Card</option>
                        </select>
                    </div>

                    <div id="genresContainer">
                        {input.genres.map((g, i) => {
                            return <li className="saved" value={g.name} key={i}> {g} <button value={g} onClick={(e) => deleteHandler(e)}> X </button> </li>
                        }
                        )}
                    </div>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
};