import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserGames } from '../../redux/actions/games/index';
import { UserContext } from '../../Context/UserContext';
import Pagination from '../Pagination/Pagination';
import Videogamescards from '../VideogameCards/VideogamesCards';

const Library = () => {
  const dispatch = useDispatch();
  const userGames = useSelector(state => state.games.userGames);
  const { value } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getUserGames(value.email));
  }, [dispatch]);

  const postperPage = 3;
  const lastPostIndex = currentPage * postperPage;
  const firstPostIndex = lastPostIndex - postperPage;
  const currentPost = userGames.videogames?.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <Videogamescards gamedata={currentPost} canReview={true}/>
      {userGames.videogames?.length > 1 ? (
        <Pagination
          totalPosts={userGames.videogames?.length}
          postPerPage={postperPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      ) : null}
    </div>
  );
};

export default Library;
