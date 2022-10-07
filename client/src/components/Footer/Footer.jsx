import React from "react";
import Style from "./footer.module.css";
import { Link } from "react-router-dom";
// import logo_wooly from "../../assets/logo_wooly.png";
import logo from "../image/Logo Games.JPG";

export default function Footer() {
  return (
    <footer className={Style.footerDistributed}>
      <div className={Style.footerLeft}>
        <div className={Style.footerLinks}>
          <Link to={"/contact"} className={Style.formatLinks}>
            CONTACT
          </Link>
          {/* <Link to={"/"} >
                    <h4 className={Style.linkOne}>Home </h4>
                </Link>
  
                <Link to={"/products"} >
                    <h4>Products </h4>
                </Link>

                <Link to={"/contact"} >
                    <h4>Contact</h4>
                </Link> */}
        </div>
      </div>

      <div className={Style.containerCenter}>
        <div className={Style.footerCenter}>
          <Link to="/">
            <img src={logo} alt="Img Not Found" className={Style.img} />
          </Link>
        </div>
      </div>

      <div className={Style.footerRight}>
        <Link to={"/about"} className={Style.formatLinks}>
          ABOUT
        </Link>
        {/* <p className={Style.footerCompanyAbout}> */}
        {/* <span>ABOUT OUR TEAM</span>
                    <br />
                    Aut ipsam autem sed velit assumenda ea magnam porro 
                    et laborum velit vel omnis alias ut neque eligendi 
                    ea voluptate eaque. Qui provident omnis ut quia 
                    voluptas ut rerum autem nam voluptate iste id modi. */}
        {/* contact us */}
        {/* </p> */}
      </div>
    </footer>
  );
}