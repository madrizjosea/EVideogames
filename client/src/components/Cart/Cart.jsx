import React, { useContext } from 'react';
import { UserContext } from "../../Context/UserContext";
import style from './Cart.module.css'
import CartCard from '../CartCard/CartCard';

export default function Cart() {
    const { cart, setCart } = useContext(UserContext)

    const onClose = (id) => {
        //let arr = [...cart]
        setCart(games => games.filter(c => c.id !== id));
        //setCart(filteredGame)
    }
    console.log(cart)
    return (
    <div>
        {cart.length>0 ?
        <div className='cards'>
        { cart.map(c => <CartCard
            name={c.name}
            rating={c.rating}
            image={c.image}
            price={c.price}
            id={c.id}
            onClose={() => onClose(c.id)}
          /> )}
        </div> 
        : <div className={style.userbody}>The cart is empty</div>}
      
    </div>
    );

    
}