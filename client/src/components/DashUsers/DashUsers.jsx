import React from 'react';
import { useEffect, useState, useContext } from 'react';
import Pagination from '../Pagination/Pagination';
import DashUserCards from '../DashUserCards/DashUserCards';
import style from './DashUsers.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/actions/user/index';
import { UserContext } from '../../Context/UserContext';

export default function DashUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const { value } = useContext(UserContext);
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.allUsers);

  useEffect(() => {
    if (users.length < 1) {
      dispatch(getUsers());
    }
  }, [dispatch, users.length]);

  const postperPage = 12;
  const lastPostIndex = currentPage * postperPage;
  const firstPostIndex = lastPostIndex - postperPage;
  const currentPost = users
    .slice(firstPostIndex, lastPostIndex)
    .filter(user => user.email !== value.email);

  return (
    <div>
      <div id={style.sort}>
        <div>
          <label>Search: </label>
          <input placeholder="Name..."></input>
        </div>

        <div>
          <label>Roles</label>
          <select>
            <option>admin</option>
            <option>user</option>
          </select>
        </div>

        <div>
          <button type="button">Order by Name</button>
        </div>
      </div>

      <div>
        <DashUserCards users={currentPost} />
        {users.length ? (
          <Pagination
            totalPosts={users.length}
            postPerPage={postperPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        ) : null}
      </div>
    </div>
  );
}
