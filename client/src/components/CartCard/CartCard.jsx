import { useState, useContext } from 'react';
import style from './CartCard.module.css'
import { UserContext } from '../../Context/UserContext';
import { useLocalStorage } from '../../customhooks/useLocalStorage';



export default function CartCard ({id, name, image, rating, price, onClose}) {

    const { total, setTotal, order, setOrder } = useContext(UserContext)
    const [quantity, setQuantity] = useLocalStorage(1)
    //console.log('quantity', quantity, 'price', price, 'total', total,'order', order)

    const add = e => {
        setTotal(total + price)
        setQuantity(Number(quantity) + 1)
        const found = order.find(e => e.id === id)
        let arrorder = [...order]
        arrorder.push(found)
        setOrder(arrorder)
        console.log('found', found, 'arrorder',arrorder)
    }

    const sub = e => {
        if(Number(quantity)>1){
        setTotal(total - price)
        setQuantity(Number(quantity) - 1)
        const found = order.find(e => e.id === id)
        const index = order.indexOf(found)
        const arrorder = [...order]
        arrorder.splice(index, 1)
        setOrder(arrorder)
        console.log('found', found, 'index', index, 'arrorder',arrorder)
        }
    }

    const reset = () => {
        setTotal(0)
    }

    return (
        <div >
        <div key={id} className={style.userbody} >
            <img className={style.pic} src={image ? image : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg'} alt={'u.img'}></img>
            <div>
                <ul className={style.name}>{name}</ul>
                </div>    
                <div>
                <ul className={style.rating}>Rating: {rating}</ul>
            </div>
            <div>
                <p className={style.price}>Price: {price}</p>
            </div>
           
            <button onClick={reset}>reset</button>
            {quantity<2 ?
            <button onClick={onClose} className="btn btn-sm btn-danger">X</button>
            :
            <></>
            }
        </div>
    </div>
    );
};
