import React from "react";
import './Pagination.css';

const Pagination = ({ totalPosts, postPerPage, setCurrentPage, currentPage, handlerPrev, handlerNext }) => {
    let pages = []
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pages.push(i)
    }
    return (
        <div className="pages">
           <button className='prev-next' onClick={handlerPrev}>Prev</button>
            {pages.map((page, index) => {
                return <button className={page === currentPage ? 'selected' : 'bpage'} key={index} onClick={() => setCurrentPage(page)}>{page}</button>
            })}
            <button className='prev-next'onClick={handlerNext}>Next</button>
        </div>
    )
}

export default Pagination