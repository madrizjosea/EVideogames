import React from 'react';
import { useEffect, useState } from 'react';
import { getOrders } from '../../redux/actions/orders';
import Pagination from '../Pagination/Pagination';
import DashOrdersCards from '../DashOrdersCards/DashOrdersCards';
import { useDispatch, useSelector } from 'react-redux';

export default function DashOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.allOrders);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  function handlerPrev() {
    setCurrentPage(currentPage - 1);
  }

  function handlerNext() {
    setCurrentPage(currentPage + 1);
  }

  const postperPage = 12;
  const lastPostIndex = currentPage * postperPage;
  const firstPostIndex = lastPostIndex - postperPage;
  const currentPost = orders.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <div>
        {orders.length ? (
          <DashOrdersCards orders={currentPost} />
        ) : (
          <p>NO ORDERS</p>
        )}

        {orders.length ? (
          <Pagination
            totalPosts={orders.length}
            postPerPage={postperPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            handlerPrev={handlerPrev}
            handlerNext={handlerNext}
          />
        ) : null}
      </div>
    </div>
  );
}
