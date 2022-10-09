import React from "react";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import DashOrdersCards from '../DashUserCards/DashUserCards';

export default function DashUsers() {

    const [currentPage, setCurrentPage] = useState(1);
    const [postperPage, setPostPerPage] = useState(12);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/orders')
            .then(r => r.json())
            .then((recurso) => {
                setOrders(recurso)
            })
    }, []);

    const lastPostIndex = currentPage * postperPage;
    const firstPostIndex = lastPostIndex - postperPage;
    const currentPost = orders.slice(firstPostIndex, lastPostIndex)

    return (
        <div>
            <div>
                { orders.length ? <DashOrdersCards orders={orders} /> : <p>NO ORDERS</p>}
                { orders.length ? <Pagination totalPosts={orders.length} postPerPage={postperPage} setCurrentPage={setCurrentPage} currentPage={currentPage} /> : undefined }
            </div>
        </div>
    )
}