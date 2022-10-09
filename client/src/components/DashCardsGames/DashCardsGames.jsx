import { NavLink } from 'react-router-dom'
import style from './DashCardsGames.module.css'

export default function DashCardsGames({ gamedata }) {
    return (
        <div className={style.container}>
            {gamedata.map((game) =>
                <div className={style.game}>
                    <div className={style.gamebody} key={game.id}>
                        <img className={style.img} src={game.image} alt={'game.image'}></img>
                        <div>
                            <p><NavLink className='navlink' to={`/Details/${game.id}`}>{game.name}</NavLink></p>
                            <p>Rating: {game.rating}</p>
                            <p>Genres: {game.genres}</p>
                            <label class="switch">
                                <input type="checkbox"/>
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
