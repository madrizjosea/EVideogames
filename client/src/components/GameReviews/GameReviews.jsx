import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsByGame } from '../../redux/actions/reviews';
import Pagination from '../Pagination/Pagination';
import ReviewCards from '../ReviewCards/ReviewCards.jsx';

export default function GameReviews({ videogameId }) {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.gameReviews);

  useEffect(() => {
    dispatch(getReviewsByGame(videogameId));
  }, [dispatch, reviews.length, videogameId]);

  function handlerPrev() {
    setCurrentPage(currentPage - 1);
  }

  function handlerNext() {
    setCurrentPage(currentPage + 1);
  }

  const postperPage = 3;
  const lastPostIndex = currentPage * postperPage;
  const firstPostIndex = lastPostIndex - postperPage;
  const currentPost = reviews.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <div>
        {reviews.length ? <ReviewCards reviews={currentPost} /> : 'NO REVIEWS'}
        {reviews.length > 1 ? (
          <Pagination
            totalPosts={reviews.length}
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
