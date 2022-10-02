import { NavLink } from 'react-router-dom'
import './VideogameCard.css'

export default function Videogamecard(videogame){
    const {name, image, rating, genres, id} = videogame
    return(
        <div className='card'>
            <div className='card-body'>
            <img className='imagen' src={image} alt={name}></img>
            <p><NavLink className='navlink' to={`/Details/${id}`}>{name}</NavLink></p>
            <p className='texto'>Rating: {rating}</p>
            <p className='texto'>Genres: {genres}</p>
            </div>
        </div>
    )
}