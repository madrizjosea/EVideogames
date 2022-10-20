import { useState } from 'react';
import style from './OrderCard.module.css';
import axios from '../../axios';

export default function OrderCard(orders) {
  const { id, email, total, state, name, games } = orders;
  const [newState, setNewState] = useState(state);
  const [changedState, setChangedState] = useState(state);

  const handleClick = async () => {
    await axios.put('/orders', {
      id: id,
      change: newState,
      accountEmail: email,
      games,
    });
    setChangedState(newState);
  };

  const handleSelect = e => {
    setNewState(e.target.value);
  };

  return (
    <div className={style.userbody}>
      <p className="card__rating">User: {name}</p>
      <p className="card__rating">Email: {email}</p>
      <p className="card__genres">Amount: {total}</p>
      <p className="card__genres">State: {changedState}</p>
      <select name="change state" onChange={handleSelect}>
        <option></option>
        <option>Payed</option>
        <option>Completed</option>
        <option>Cancelled</option>
      </select>
      <button onClick={handleClick}>Change State</button>
    </div>
  );
}
