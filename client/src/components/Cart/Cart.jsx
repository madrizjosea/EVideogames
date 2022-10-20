import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import style from "./Cart.module.css";
import CartCard from "../CartCard/CartCard";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function Cart() {
  function getCookie(c_name) {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=");
      if (c_start !== -1) {
        c_start = c_start + c_name.length + 1;
        let c_end = document.cookie.indexOf(";", c_start);
        if (c_end === -1) {
          c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return "";
  }
  const cookie = getCookie("token");
  let user = "";
  if (cookie) {
    user = jwtDecode(cookie);
  }

  const history = useNavigate();
  const { cart, setCart, order, setOrder, total, setTotal } =
    useContext(UserContext);

  console.log("cart", cart, "token", "order", order, "user", user);

  const reset = (e) => {
    setOrder("");
    setTotal(0);
  };

  const handleClick = () => {
    setOrder({
      games: order,
      user: user.id,
      total: total,
    });
    setTotal(0);
    history("/Payment");
  };

  const onClose = (id, price, quant) => {
    //let arr = [...cart]
    setCart((games) => games.filter((c) => c.id !== id));
    setTotal((total - price));
    //setCart(filteredGame)
  };
  console.log("total", total, "order", order, "cart", cart);
  return (
    <div>
      {cart.length > 0 ? (
        <div className={style.cards}>
          {cart.map((c) => (
            <CartCard
              key={c.id}
              name={c.name}
              rating={c.rating}
              image={c.image}
              price={c.price}
              id={c.id}
              onClose={() => onClose(c.id, c.price)}
            />
          ))}
          Total: ${total}
          <br />
          {cookie.length > 1 ? (
            <button className={style.compra} onClick={handleClick}>Comprar</button>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div className={style.userbody}>The cart is empty</div>
      )}
    </div>
  );
}
