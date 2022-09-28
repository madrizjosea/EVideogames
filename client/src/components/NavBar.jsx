import React from "react";
import { NavLink } from 'react-router-dom';
import './css/Navbar.css';

export default function Navbar(){
   return( 
   <nav>
    <ul>
    <li>
    <NavLink className='navlink' to={'/Main'}>Main Page</NavLink>
    </li>
    <li>
    <NavLink className='navlink' to={'/CreateUser'}>Registrarse</NavLink>
    </li>
    </ul>
   </nav>
   )
}