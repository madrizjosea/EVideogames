import style from "./DashOrdersCards.module.css";

export default function DashOrdersCards({ orders }) {
    return (
      <div >
      {orders.map((u) =>
          <div >
              <div key={orders.id} className={style.userbody} >
                  <div>
                      <p>Id: {u.id}</p>
                      <p>Amount: {u.total}</p>
                  </div>
                  <div>
                      <p>UserID: {u.userId}</p>
                  </div>
                  <div>
                      <p>State: {u.state}</p>
                      <button>Change state</button>
                  </div>
              </div>
          </div>
      )}
  </div>
);
  }