import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGame, getUserGames } from '../../redux/actions/games';
import { UserContext } from '../../Context/UserContext';
import { useState } from 'react';
import { clearDetail } from '../../redux/actions/games/index';
import { getReviewsByUser } from '../../redux/actions/reviews';
import GameReviews from '../GameReviews/GameReviews.jsx';
import AddReview from '../AddReview/AddReview.jsx';
import Rating from '@mui/material/Rating';
import styles from './Details.module.css';

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(state => state.games.game);
  const userGames = useSelector(state => state.games.userGames);
  const userReviews = useSelector(state => state.reviews.userReviews);
  const { value, cart, setCart, order, setOrder, total, setTotal } =
    useContext(UserContext);
  const [msg, setmsg] = useState('');

  useEffect(() => {
    dispatch(getGame(id));
    if (value.email) {
      dispatch(getUserGames(value.email));
      dispatch(getReviewsByUser(value.email));
    }
    //* limpiamos el estado cuando renderiza clear detail

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);
  //console.log(details)

  //const canReview = userGames.videogames

  const onClick = () => {
    let arrcart = [...cart];
    if (cart.length < 1) {
      arrcart.push(details);
      setTotal(total + details.price);
      setOrder(arrcart);
      setCart(arrcart);
      setmsg('Game added to cart');
    } else {
      let idarr = [];
      for (let i = 0; i < cart.length; i++) {
        idarr.push(cart[i].id);
      }
      const incluye = idarr.includes(details.id);
      if (!incluye) {
        arrcart.push(details);
        setTotal(total + details.price);
        setCart(arrcart);
        setOrder(arrcart);
        setmsg('Game added to cart');
      } else {
        setmsg('Game is already in the cart');
      }
    }
  };

  return details.id ? (
    <section className={styles.container}>

      <div className={styles.up}>
        
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
              <h2>Price: ${details.price}</h2>
              <button className={styles.addCart} onClick={onClick}>
                Add to Cart
              </button>
              {msg ? <p className={styles.confirmation}>{msg}</p> : <div></div>}
            </div>
            <div className={styles.ratings}>
              {details.audiences[0] ? <p>{details.audiences[0].name}</p> : null}
              {details.rating ? <p><Rating
                name="half-rating-read"
                value={details.rating}
                precision={0.5}
                readOnly
              /></p> : null}
            </div>
          </div>
          <p className={styles.description}>{details.description}</p>
        </div>
      </div>

      <div className={styles.down}>
        {userGames.videogames?.find(g => g.id === details.id) &&
          !userReviews.length ? (
          <AddReview videogameId={details.id} userData={value} />
        ) : userGames.videogames?.find(g => g.id === details.id) &&
          !userReviews?.find(r => r.videogameId === id) ? (
          <AddReview videogameId={details.id} userData={value} />
        ) : null}

        <GameReviews videogameId={id} />
      </div>


    </section>
  ) : (
    <h1>Loading...</h1>
  );
}
