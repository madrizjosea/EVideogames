import React from "react";
import { useNavigate } from 'react-router-dom';
import Style from './Landing.module.css'
import logo from "../image/Logo.JPG";
import { Link } from "react-router-dom";

const Landing = () => {

    const history = useNavigate();

    const handleclick = () => {
        history("/Main");
    }

    return(<div className= {Style.landingContainer}>
        {/* <h1 className={Style.tittle}>Bienvenido</h1> */}
       {/* <button className="button" type="button" onClick={handleclick}>Ingresar</button> */}
       <button className={Style.center} onClick={handleclick}>
         <Link to={"/"}>
           {/* <img src={logo_wooly} alt="Not Found" width="85px" height="85px" className={Style.logo} /> */}
           <img
             src={logo}
             alt="Not Found"
             width="85px"
             height="85px"
             className={Style.logo}
             />
         </Link>
         </button>
           
            </div>
            

        
    )
}

export default Landing