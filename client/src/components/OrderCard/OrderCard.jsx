import { useState } from 'react';
import style from './OrderCard.module.css'
import axios from '../../axios';

export default function OrderCard(orders){
    const { id, total, userId, state } = orders

    const [newState, setNewState] = useState(state)
    const [changedState, setChangedState] = useState(state)

    const handleClick = async () => {
        const res = await axios.put('/orders', { id:id, change: newState });
        setChangedState(newState)
        console.log(res)
    }

    const handleSelect = (e) => {
        setNewState(e.target.value)
    }
    console.log('order', orders, 'newState', newState)
    return(
            <div className={style.userbody}>
            <p className='card__name'>OrderId: {id}</p>
            <p className='card__rating'>UserId: {userId}</p>
            <p className='card__genres'>Amount: {total}</p>
            <p className='card__genres'>State: {changedState}</p>
            <select name="change state" onChange={handleSelect}>
            <option></option>
            <option>Payed</option>
            <option>Completed</option>
            <option>Cancelled</option>
            </select>
            <button onClick={handleClick}>Change State</button>
            </div>
    )
}