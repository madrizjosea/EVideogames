import OrderCard from '../OrderCard/OrderCard';
import style from './DashOrdersCards.module.css';

export default function DashOrdersCards({ orders }) {
  return (
    <div>
      {orders.map(order => (
        <OrderCard
          id={order.id}
          name={order.username}
          email={order.accountEmail}
          date={order.date}
          key={order.id}
          total={order.total}
          games={order.games}
          state={order.state}
        />
      ))}
    </div>
  );
}
