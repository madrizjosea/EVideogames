import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addGame } from '../../redux/actions/games/index.js';

export default function AddVideogame() {

    const dispatch = useDispatch();

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
        console.log(input);
    }

    function audiencetHandler(e) {
        console.log(e.target);
        setInput({
            ...input, audiences: e.target.value
        })
        console.log(input);
    }

    function genreHandler(e) {
        console.log(e.target);

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
        console.log(input);
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
    }

    return (

        <div id="containerForm">
            <form id="Form" onSubmit={e => submitHandler(e)}>

                <h1>New Videogame</h1>

                <p className="labelForm">Name:</p>

                <div className="err">
                    <input value={input.name} type="text" name="name" onChange={(e) => changeHandler(e)} />
                </div>

                <p className="labelForm">Description:</p>

                <div className="err">
                    <input value={input.description} type="text" name="description" onChange={(e) => changeHandler(e)} />
                </div>

                <p className="labelForm">Image:</p>

                <div className="err">
                    <input value={input.image} type="text" name="image" onChange={(e) => changeHandler(e)} />
                </div>

                <p className="labelForm">Release Date:</p>

                <div className="err">
                    <input value={input.releaseDate} type="text" name="releaseDate" onChange={(e) => changeHandler(e)} />
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