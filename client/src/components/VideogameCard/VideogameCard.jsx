import { Link } from 'react-router-dom'
import './VideogameCard.css'

export default function Videogamecard({ name, image, rating, genres, id }) {
    return (
        <div className='card'>
            <div className='card__cointainerimagen'>
                <Link to={`/Details/${id}`}>
                    <img className='imagen' src={image} alt={name}></img>
                </Link>
            </div>
            <div className='card__body'>
                <p className='card__name'>name: {name}</p>
                <p className='card__rating'>Rating: {rating}</p>
                <p className='card__genres'>Genres:</p>
                {genres?.map((g, i) => (
                    <p key={i}>{g.name}</p>
                ))}
            </div>
        </div>
    )
}