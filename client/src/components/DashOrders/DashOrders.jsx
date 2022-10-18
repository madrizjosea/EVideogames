import React from "react";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import DashOrdersCards from '../DashOrdersCards/DashOrdersCards';

export default function DashOrders() {

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

    function handlerPrev(){
        if(currentPage <= 1) return;
        Pagination(currentPage - 1);
    }

    function handlerNext(){
        if(currentPage >= currentPage.length) return;
        Pagination(currentPage + 1);
    }
    return (
        <div>
            <div>
                { orders.length ? <DashOrdersCards orders={orders} /> : <p>NO ORDERS</p>}
                <button onClick={()=> handlerPrev()} >{"<"}</button>
                { orders.length ? <Pagination totalPosts={orders.length} postPerPage={postperPage} setCurrentPage={setCurrentPage} currentPage={currentPage} /> : undefined }
                <button onClick={()=> handlerNext()} >{">"}</button>
            </div>
        
        </div>
    )
}