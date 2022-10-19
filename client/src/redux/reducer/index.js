import { combineReducers } from 'redux';
import games from './games.js';
import cart from './cart.js';
import users from './users.js';
import reviews from './reviews.js';

export default combineReducers({
  games,
  cart,
  users,
  reviews,
});
