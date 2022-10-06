import React from "react";
import { useState } from "react";
import DashGames from "../DashGames/DashGames.jsx";
import DashUsers from '../DashUsers/DashUsers.jsx';
import style from './Dashboard.module.css';

export default function Dashboard() {

    const [currentView, setCurrentView] = useState('games');

    function clickHandler(e) {
        setCurrentView(e.target.value);
        console.log(currentView)
    }

    return (
        <div>

            <div id={style.admin}>
                <div><button className={style.adminOptions} value='games' onClick={(e) => clickHandler(e)}>Games</button></div>
                <div><button className={style.adminOptions} value='sales' onClick={(e) => clickHandler(e)}>Sales</button></div>
                <div><button className={style.adminOptions} value='users' onClick={(e) => clickHandler(e)}>Users</button></div>
            </div>

            <div>
                {currentView === 'games' ? (<DashGames/>) : undefined }
                {currentView === 'users' ? (<DashUsers/>) : undefined }
            </div>
        </div>
    )
}