import { NavLink } from 'react-router-dom';
import style from './DashCardsGames.module.css';
import { editGame } from '../../redux/actions/games';

export default function DashCardsGames({ gamedata }) {

    function checkHandler(e){
        console.log(e.target.value);
    }

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
                                <input type="checkbox" value={game.isAvailable} onChange={(e)=>checkHandler(e)}/>
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
