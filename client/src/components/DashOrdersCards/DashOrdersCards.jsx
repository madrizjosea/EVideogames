import OrderCard from "../OrderCard/OrderCard";
import style from "./DashOrdersCards.module.css";

export default function DashOrdersCards({ orders }) {
    return (
      <div >
      {orders.map((u) =>
          <OrderCard
          id = {u.id}
          userId = {u.userId}
          date = {u.date}
          key= {u.id}
          total= {u.total}
          state= {u.state}
          
          />
      )}
  </div>
);
  }