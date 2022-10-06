import React from "react";
import DashGames from "../DashGames/DashGames.jsx";
import style from './Dashboard.module.css';

export default function Dashboard() {

    return (
        <div>

            <div id={style.admin}>
                <div><button className={style.adminOptions} href="/dogs">Games</button></div>
                <div><button className={style.adminOptions} href="/add">Sales</button></div>
                <div><button className={style.adminOptions} href="/add">Users</button></div>
            </div>

            <DashGames/>

        </div>
    )
}