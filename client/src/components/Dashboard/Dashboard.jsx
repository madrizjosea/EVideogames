import React from "react";
import { useState } from "react";
import DashGames from "../DashGames/DashGames.jsx";
import DashUsers from '../DashUsers/DashUsers.jsx';
import DashOrders from '../DashOrders/DashOrders.jsx';
import style from './Dashboard.module.css';
// import jwt_decode from 'jwt-decode';

export default function Dashboard() {

    const [currentView, setCurrentView] = useState('games');

    function clickHandler(e) {
        setCurrentView(e.target.value);
        console.log(currentView)
    }

    return (
        <div id={style.dash}>
            <div id={style.admin}>
                <div><button className={ currentView === 'games' ? style.selectedOption : style.adminOptions } value='games' onClick={(e) => clickHandler(e)}>Games</button></div>
                <div><button className={ currentView === 'orders' ? style.selectedOption : style.adminOptions } value='orders' onClick={(e) => clickHandler(e)}>Orders</button></div>
                <div><button className={ currentView === 'users' ? style.selectedOption : style.adminOptions } value='users' onClick={(e) => clickHandler(e)}>Users</button></div>
            </div>

            <div id={style.view}>
                {currentView === 'games' ? (<DashGames/>) : undefined }
                {currentView === 'users' ? (<DashUsers/>) : undefined }
                {currentView === 'orders' ? (<DashOrders/>) : undefined }
            </div>
        </div>

