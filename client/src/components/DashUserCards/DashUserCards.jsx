import style from './DashUserCards.module.css';
import { editUser, deleteUser, getUsers } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";

export default function DashUserCards({ users }) {

    const dispatch = useDispatch();

    function roleChangeHandler(e, role, id, name) {
        if (window.confirm(`Do you want to change ${name}'s role?`)) {
            if (e.target.value && e.target.value !== role) {
                dispatch(editUser(id, { role: e.target.value }));
                dispatch(getUsers());
            }
        }
        e.target.value = 'default';
    }

    function clickHandler(e) {
        if (window.confirm(`Do you want to permanently delete user ${e.target.name}?`)) dispatch(deleteUser(e.target.value));
    }

    return (
        <div >
            {users.map((u) =>
                <div key={u.id}>
                    <div className={style.userbody} >
                        <button name={u.name} value={u.id} onClick={(e) => clickHandler(e)}>X</button>
                        <img className={style.pic} referrerPolicy="no-referrer" src={u.image ? u.image : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg'} alt={'u.img'}></img>
                        <div>
                            <p>{u.name}</p>
                            <p>Email: {u.email}</p>
                        </div>
                        <div>
                            <label>
                                <p>Role: {u.role}</p>
                                {u.role ? (
                                    <select onChange={(e) => roleChangeHandler(e, u.role, u.id, u.name)} defaultValue="default">
                                        <option value='default' disabled='default' hidden >Select role</option>
                                        <option value='admin'>Admin</option>
                                        <option value='user'>User</option>
                                    </select>
                                ) : null}

                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}