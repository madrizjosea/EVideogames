import { useState, useContext } from 'react';
import style from './CartCard.module.css'
import { UserContext } from '../../Context/UserContext';



export default function CartCard ({id, name, image, rating, price, onClose}) {

    const { total, setTotal, order, setOrder } = useContext(UserContext)
    const [quantity, setQuantity] = useState(1)
    console.log('quantity', quantity, 'price', price, 'total', total,'order', order)

    const add = e => {
        setTotal(total + price)
        setQuantity(Number(quantity) + 1)
        const found = order.find(e => e.id === id)
        let arrorder = [...order]
        arrorder.push(found)
        setOrder(arrorder)
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
        }
    }

    return (
        <div >
        <div key={id} className={style.userbody} >
            <img className={style.pic} src={image ? image : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg'} alt={'u.img'}></img>
            <div>
                <p>{name}</p>
                <p>Rating: {rating}</p>
            </div>
            <div>
                <p>Unit Price: {price}</p>
            </div>
            <label>Quantity</label>
            <button onClick={add}>Add</button>
            <button onClick={sub}>Sub</button>
            <div>
                <p>Quantity: {quantity}</p>
            </div>
            <div>
                <p>Total Price: {price * quantity}</p>
            </div>
            {quantity<2 ?
            <button onClick={onClose} className="btn btn-sm btn-danger">X</button>
            :
            <></>
            }
        </div>
    </div>
    );
};
