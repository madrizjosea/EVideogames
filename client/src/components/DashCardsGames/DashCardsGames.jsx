import { NavLink } from 'react-router-dom';
import style from './DashCardsGames.module.css';
import { editGame, getAllGames } from '../../redux/actions/games';
import { useDispatch } from 'react-redux';

export default function DashCardsGames({ gamedata }) {

    const dispatch = useDispatch();

    function availabilityHandler(e, availability, id, name) {
        if (window.confirm(`Do you want to change ${name}'s availability?`)) {
            if (e.target.value && e.target.value !== availability) {
                dispatch(editGame(id, { isAvailable: e.target.value }));
            }
        }
        dispatch(getAllGames());
        e.target.value = 'default';
    }

    return (
        <div className={style.container}>
            {gamedata?.map((game) =>
                <div className={style.game} key={game.id}>
                    <div className={style.gamebody}>
                        <img className={style.img} src={game.image} alt={'game.image'}></img>
                        <div className={style.text}>
                            <p><NavLink className={style.navlink} to={`/Details/${game.id}`}>{game.name}</NavLink></p>
                            <p>Rating: {game.rating}</p>
                            <p>Genres:</p>
                            {game.genres?.map((g, i) => (
                                <p key={i} >{g.name}</p>
                            ))}
                        </div>
                        <p >Availability: {game.isAvailable === true ? 'Available' : 'Unavailable'}</p>
                        <select  className={style.select} onChange={(e) => availabilityHandler(e, game.isAvailable, game.id, game.name)} defaultValue="default">
                            <option className={style.selectOption}value='default' disabled='default' hidden>Select Availability</option>
                            <option value={true}>Available</option>
                            <option value={false}>Unavailable</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}
