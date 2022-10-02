import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGame } from '../../redux/actions/games';
import styles from './Details.module.css';

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(state => state.games.game);

  useEffect(() => {
    dispatch(getGame(id));
  }, [dispatch, id]);

  return details.id ? (
    <section className={styles.container}>
      <div className={styles.leftSide}>
        <h3>{details.name}</h3>
        <div className={styles.imageContainer}>
          <img src={details.image} alt={details.name} />
        </div>
      </div>
      <div className={styles.middle}>
        <div>
          <h2>Release Date: {details.releaseDate}</h2>
          <div className={styles.btns}>
            <h2>Price: $60</h2>
            {/* <button>Add to Cart</button>
            <button>Write review</button> */}
          </div>
          <div className={styles.ratings}>
            <p>{details.audiences[0].name}</p>
            <p>Rating {details.rating}</p>
          </div>
        </div>
        <p className={styles.description}>{details.description}</p>
      </div>
    </section>
  ) : <h1>Loading...</h1>;
}
