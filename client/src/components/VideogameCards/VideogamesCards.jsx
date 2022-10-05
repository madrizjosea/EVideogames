import Videogamecard from "../VideogameCard/VideogameCard";
import Style from "./videogames.module.css";

export default function Videogamescards({ gamedata }) {
  return (
    <div>
      <div className={Style.cointainerCard}>
        {gamedata.map((game) =>
          <Videogamecard
            key={game.id}
            name={game.name}
            image={game.image}
            rating={game.rating}
            genres={game.genres}
            id={game.id}
          />)}
      </div>
    </div>
  );
}