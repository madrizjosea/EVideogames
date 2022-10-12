import React, { useContext } from 'react';
import { UserContext } from "../../Context/UserContext";
import style from './Cart.module.css'
import CartCard from '../CartCard/CartCard';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    
    const history = useNavigate();
    const { cart, setCart, order, setOrder } = useContext(UserContext)
    let total = 0


    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].price;
        
    }

    const handleClick = () => {
        setOrder({
            games: cart,
            total: total
        })
        history('/Payment')
    }

    const onClose = (id) => {
        //let arr = [...cart]
        setCart(games => games.filter(c => c.id !== id));
        //setCart(filteredGame)
    }
    console.log('total', cart,'order', order)
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
          Total: {total}
          <br/>
          <button onClick={handleClick}>Comprar</button>
        </div> 
        : <div className={style.userbody}>The cart is empty</div>}
      
    </div>
    );

    
}