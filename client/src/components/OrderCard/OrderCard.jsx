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
      <p className={style.card__name}>User: {name}</p>
      <p className={style.card__email}>Email: {email}</p>
      <p className={style.card__total}>Amount: {total}</p>
      <p className={style.card__state}>State: {changedState}</p>
      <select name="change state" onChange={handleSelect}>
        <option></option>
        <option>Payed</option>
        <option>Completed</option>
        <option>Cancelled</option>
      </select>
      <button className={style.change}onClick={handleClick}>Change State</button>
    </div>
  );
}
