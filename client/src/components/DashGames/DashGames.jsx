import React from "react";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import DashCardsGames from "../DashCardsGames/DashCardsGames";
import style from '../DashGames/DashGames.module.css';

export default function  DashGames() {
    
    const [buscar, setBuscar] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [postperPage, setPostPerPage] = useState(14);
    const [gamedata, setGame] = useState([]);
    const [order, setOrder] = useState('asc')
    const [order2, setOrder2] = useState('asc')
    const [genre, setGenre] = useState('')

    useEffect(() => {
        fetch('http://localhost:3001/videogames')
            .then(r => r.json())
            .then((recurso) => {
                var arrdef = []
                for (let i = 0; i < recurso.length; i++) {
                    var arr2 = []
                    for (let y = 0; y < recurso[i].genres.length; y++) {
                        arr2.push(recurso[i].genres[y].name)
                    }

                    var string = arr2.toString()

                    var obj = {
                        id: recurso[i].id,
                        name: recurso[i].name,
                        genres: string,
                        rating: recurso[i].rating,
                        image: recurso[i].image,
                    }
                    arrdef.push(obj)
                    setGame(arrdef)
                }
            })
    }, []);

    let handleSelect = (e) => {
        setGenre(e.target.value)
        setCurrentPage(1)
    }

    const searcher = (e) => {
        setBuscar(e.target.value)
        setCurrentPage(1)
    }

    let results = []

    if (!buscar) {
        results = gamedata
    } else {
        results = gamedata.filter((dato) =>
            dato.name.toLowerCase().includes(buscar.toLowerCase())
        )
    }

    if (genre) {
        results = results.filter((dato) =>
            dato.genres.toLowerCase().includes(genre.toLowerCase())
        )
    }

    const sorting = () => {
        if (order === 'asc') {
            const sorted = [...gamedata].sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
            setGame(sorted);
            setOrder('dsc')
        }
        if (order === 'dsc') {
            const sorted = [...gamedata].sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1);
            setGame(sorted);
            setOrder('asc')
        }
    }

    const sorting2 = () => {
        if (order2 === 'asc') {
            const sorted = [...gamedata].sort((a, b) => a.rating > b.rating ? 1 : -1);
            setGame(sorted);
            setOrder2('dsc')
        }
        if (order2 === 'dsc') {
            const sorted = [...gamedata].sort((a, b) => a.rating < b.rating ? 1 : -1);
            setGame(sorted);
            setOrder2('asc')
        }
    }

    const lastPostIndex = currentPage * postperPage;
    const firstPostIndex = lastPostIndex - postperPage;
    const currentPost = results.slice(firstPostIndex, lastPostIndex)

    return (
        <div>
            <div id={style.controls}>
                <div>
                    <label htmlFor="title">Search: </label>
                    <input placeholder="Title..." type="text" value={buscar} onChange={searcher}></input>
                </div>

                <div>
                    <a className="bttn" type='button' href='/AddGame'>New Game</a>
                </div>

                <div>
                    <label>Genres</label>

                    <select name='filtro' onChange={handleSelect}>
                        <option>Genres</option>
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

                <div>
                    <button className="bttn" type='button' onClick={() => sorting()}>Order by Name</button>
                    <button className="bttn" type='button' onClick={() => sorting2()}>Order by Rating</button>
                </div>
            </div>

            <div>
                <DashCardsGames gamedata={currentPost}/>
                { results.length ? <Pagination totalPosts={results.length} postPerPage={postperPage} setCurrentPage={setCurrentPage} currentPage={currentPage} /> : undefined }
            </div>
        </div>
    )
}