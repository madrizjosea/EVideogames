import React from "react";
import { useNavigate } from 'react-router-dom';
import './Landing.css'

const Landing = () => {

    const history = useNavigate();

    const handleclick = () => {
        history("/Main");
    }

    return(<div className="div">
        <h1 className="texto">Bienvenido</h1>
        <button className="button" type="button" onClick={handleclick}>Ingresar</button>
        </div>
    )
}

export default Landing