import { NavLink } from 'react-router-dom';
import style from './DashCardsGames.module.css';
import { editGame } from '../../redux/actions/games';
import { useDispatch } from 'react-redux';

export default function DashCardsGames({ gamedata }) {

    const dispatch = useDispatch();

    function checkHandler(e) {
        console.log(e.target.value);
        if (e.target.value === true) {
            dispatch(editGame(e.target.id, { isAvailable: false }));
        }
        if (e.target.value === false) {
            dispatch(editGame(e.target.id, { isAvailable: true }));
        }
    }

    return (
        <div className={style.container}>
            {gamedata?.map((game) =>
                <div className={style.game} key={game.id}>
                    <div className={style.gamebody}>
                        <img className={style.img} src={game.image} alt={'game.image'}></img>
                        <div>
                            <p><NavLink className='navlink' to={`/Details/${game.id}`}>{game.name}</NavLink></p>
                            <p>Rating: {game.rating}</p>
                            <p>Genres:</p>
                            {game.genres?.map((g,i) => (
                                <p key={i} >{g.name}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
