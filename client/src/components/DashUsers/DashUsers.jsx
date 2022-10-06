import React from "react";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import DashUserCards from '../DashUserCards/DashUserCards';

export default function DashUsers() {

    const [currentPage, setCurrentPage] = useState(1);
    const [postperPage, setPostPerPage] = useState(12);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(r => r.json())
            .then((recurso) => {
                setUsers(recurso)
            })
    }, []);

    const lastPostIndex = currentPage * postperPage;
    const firstPostIndex = lastPostIndex - postperPage;
    const currentPost = users.slice(firstPostIndex, lastPostIndex)

    return (
        <div>
            <div>
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
                <Pagination totalPosts={users.length} postPerPage={postperPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
        </div>
    )
}