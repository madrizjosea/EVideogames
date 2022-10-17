import React, { useContext } from 'react';
import { UserContext } from "../../Context/UserContext";
import style from './Cart.module.css'
import CartCard from '../CartCard/CartCard';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    
    const history = useNavigate();
    const { cart, setCart, order, setOrder, total, setTotal } = useContext(UserContext)
    
console.log('cart', cart)

const reset = (e) => {
    setOrder('')
    setTotal(0)
}

    const handleClick = () => {
        setOrder({
            games: cart,
            total: total
        })
        history('/Payment')
    }

    const onClose = (id, price, quant) => {
        //let arr = [...cart]
        setCart(games => games.filter(c => c.id !== id));
        setTotal(total - price)
        //setCart(filteredGame)
    }
    console.log('total', total,'order', order)
    return (
    <div><button onClick={reset}>Reset</button>
        {cart.length>0 ?
        <div className='cards'>
        { cart.map(c => <CartCard
            key={c.id}
            name={c.name}
            rating={c.rating}
            image={c.image}
            price={c.price}
            id={c.id}
            onClose={() => onClose(c.id, c.price)}
          /> )}
          Total: {total}
          <br/>
          
          <button onClick={handleClick}>Comprar</button>
        </div> 
        : <div className={style.userbody}>The cart is empty</div>}
      
    </div>
    );

    
}