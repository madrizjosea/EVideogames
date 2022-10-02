import Videogamecard from "../VideogameCard/VideogameCard";

export default function Videogamescards({gamedata}) {
    return (
      <div>
        {gamedata.map((game) => 
        <Videogamecard
            key={game.id}
            name={game.name}
            image={game.image}
            rating={game.rating}
            genres={game.genres}
            id={game.id}
          /> )}
      </div>
    );
  }