import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsByGame } from "../../redux/actions/reviews";
import Pagination from "../Pagination/Pagination";
import ReviewCards from '../ReviewCards/ReviewCards.jsx';

export default function GameReviews({videogameId}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [postperPage, setPostPerPage] = useState(3);

    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews.gameReviews);

    useEffect(() => {
        if (reviews.length < 1) {
            dispatch(getReviewsByGame(videogameId));
        }
    }, [dispatch]);
    
    console.log(reviews);

    function handlerPrev() {
        setCurrentPage(currentPage - 1);
    }

    function handlerNext() {
        setCurrentPage(currentPage + 1);
    }

    const lastPostIndex = currentPage * postperPage;
    const firstPostIndex = lastPostIndex - postperPage;
    const currentPost = reviews.slice(firstPostIndex, lastPostIndex)

    return (
        <div>
            <div>
                {reviews.length ? (
                    <ReviewCards reviews={reviews} />
                ) : null }
                {reviews.length > 1 ? <Pagination totalPosts={reviews.length} postPerPage={postperPage} setCurrentPage={setCurrentPage} currentPage={currentPage} handlerPrev={handlerPrev} handlerNext={handlerNext} /> : undefined}
            </div>
        </div>
    )
}