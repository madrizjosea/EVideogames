import { NavLink } from 'react-router-dom'
import './VideogameCard.css'

export default function Videogamecard(videogame){
    const {name, image, rating, genres, id} = videogame
    return(
        <NavLink to={`/Details/${id}`}>
        <div className='card'>
            <div className='card__cointainerimagen'>
          <img className='imagen' src={image} alt={name}></img>


            </div>
            <div className='card__body'>
            <p className='card__name'>name: {name}</p>
            <p className='card__rating'>Rating: {rating}</p>
            <p className='card__genres'>Genres: {genres}</p>
            </div>
        </div>
        </NavLink>
    )
}