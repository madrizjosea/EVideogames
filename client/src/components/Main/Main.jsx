import React from 'react';
import { useEffect, useState, useContext } from 'react';
import Pagination from '../Pagination/Pagination';
import Videogamescards from '../VideogameCards/VideogamesCards';
import './Main.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, getUserGames } from '../../redux/actions/games';
import { UserContext } from '../../Context/UserContext';

export default function Main() {
  const [buscar, setBuscar] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState('asc');
  const [order2, setOrder2] = useState('asc');
  const [genre, setGenre] = useState('');
  const { value } = useContext(UserContext);
  // console.log(setPostPerPage);

  const dispatch = useDispatch();
  const games = useSelector(state => state.games.allGames);

  useEffect(() => {
    if (value) {
      dispatch(getUserGames(value.email));
    }
    if (games.length < 1) {
      dispatch(getAllGames());
    }
  }, [dispatch, games]);

  // console.log(games);

  let handleSelect = e => {
    setGenre(e.target.value);
    setCurrentPage(1);
  };

  const searcher = e => {
    setBuscar(e.target.value);
    setCurrentPage(1);
  };

  let results = [];

  if (!buscar) {
    results = games;
  } else {
    results = games.filter(dato =>
      dato.name.toLowerCase().includes(buscar.toLowerCase())
    );
  }

  if (genre) {
    results = results.filter(game =>
      game.genres.find(g => g.name.toLowerCase() === genre.toLowerCase())
    );
  }

  // console.log(results);
  const sorting = e => {
    e.preventDefault();
    if (order === 'asc') {
      results = results.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
      setOrder('dsc');
    }
    if (order === 'dsc') {
      results = results.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
      );
      setOrder('asc');
    }
  };
  // console.log('result' + results);
  const sorting2 = e => {
    e.preventDefault();
    if (order2 === 'asc') {
      results = results.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      setOrder2('dsc');
    }
    if (order2 === 'dsc') {
      results = results.sort((a, b) => (a.rating < b.rating ? 1 : -1));

      setOrder2('asc');
    }
  };

  function handlerPrev() {
    setCurrentPage(currentPage - 1);
  }

  function handlerNext() {
    setCurrentPage(currentPage + 1);
  }

  const postperPage = 12;
  const lastPostIndex = currentPage * postperPage;
  const firstPostIndex = lastPostIndex - postperPage;
  const currentPost = results
    .slice(firstPostIndex, lastPostIndex)
    .filter(g => g.isAvailable === true);

  return games ? (
    <div>
      <div className="con">
        <div className="divcontainer">
          <label className="texto" htmlFor="title">
            Game Title
          </label>
          {
            <input
              placeholder="Buscar"
              type="text"
              value={buscar}
              onChange={searcher}
            ></input>
          }
        </div>
        <div className="divcontainer">
          {
            <div className="div">
              <button className="button" type="button" onClick={sorting}>
                Order by Name
              </button>
            </div>
          }
          <div className="div">
            <button className="button" type="button" onClick={sorting2}>
              Order by Rating
            </button>
          </div>
        </div>
        <div className="divcontainer">
          <label className="texto">Genres</label>
          <select name="filtro" onChange={handleSelect}>
            <option value="">All Genres</option>
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
      </div>
      <div>
        <Videogamescards gamedata={currentPost} />
        {results.length > 1 ? (
          <Pagination
            totalPosts={results.length}
            postPerPage={postperPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            handlerPrev={handlerPrev}
            handlerNext={handlerNext}
          />
        ) : null}
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
