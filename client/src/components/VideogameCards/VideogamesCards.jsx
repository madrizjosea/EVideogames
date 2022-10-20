import Videogamecard from '../VideogameCard/VideogameCard';
import Style from './videogames.module.css';

export default function Videogamescards({ gamedata, canReview }) {
  return (
    <div className={Style.cointainerCard}>
      {gamedata?.map(game => (
        <Videogamecard
          key={game.id}
          name={game.name}
          image={game.image}
          rating={game.rating}
          genres={game.genres}
          id={game.id}
          canReview={canReview}
        />
      ))}
    </div>
  );
}
