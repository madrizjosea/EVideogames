import Videogamecard from "../VideogameCard/VideogameCard";
import Style from "./videogames.module.css";

export default function Videogamescards({gamedata}) {
    return (
      <div className={Style.cointainerCard}>
          <div className={Style.image}>
            {/* <img src={hombre}alt="#" /> */}
            {/* <img className={s.img} src={mujer3} alt= "#" width="45%" height="45%"/> */}
            <img className={Style.img} src={gamedata} alt= "#" width="45%" height="45%"/>
            {/* <img src={gift} alt="#" /> */}
            {/* <img src={foto} alt="#" /> */}
      
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
      </div>
    );
  }