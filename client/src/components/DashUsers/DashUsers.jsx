import React from "react";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import DashUserCards from '../DashUserCards/DashUserCards';
import style from './DashUsers.module.css';
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/user/index";

export default function DashUsers() {

    const [currentPage, setCurrentPage] = useState(1);
    const [postperPage, setPostPerPage] = useState(12);
    //const [users, setUsers] = useState([]);

    const dispatch = useDispatch();
    const users = useSelector(state => state.users.allUsers);

    useEffect(() => {
        if (users.length < 1) {
            dispatch(getUsers());
        }
    }, [dispatch]);

    const lastPostIndex = currentPage * postperPage;
    const firstPostIndex = lastPostIndex - postperPage;
    const currentPost = users.slice(firstPostIndex, lastPostIndex)

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
                    <button type='button'>Order by Name</button>
                </div>
            </div>

            <div>
                <DashUserCards users={users} />
                {users.length > 1 ? <Pagination totalPosts={users.length} postPerPage={postperPage} setCurrentPage={setCurrentPage} currentPage={currentPage} /> : undefined }
            </div>
        </div>
    )
}