import React /* { useEffect } */ from "react";
import jwtDecode from "jwt-decode";
import style from "./profileClient.module.css";
//import ProfileClient from "./ProfileClient.jsx";
//import { useDispatch, useSelector } from "react-redux";
//import { deleteUsers, getAllUsers } from "../../redux/actions";

export default function Profile () {

    let tokencode = document.cookie.replace('token=', '')
    let decodedtoken = jwtDecode(tokencode)
    console.log(decodedtoken)

    /* const dispatch = useDispatch();
   // const users = useSelector((state) => state.allUsers);
    const user_login = useSelector((state) => state.user_login);


    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(deleteUsers())
    }, [dispatch]);

    const userConected = users.find(user => user.id === user_login.id)
     */
    
        return (
 
            <div className={style.userbody}>
                <img src={decodedtoken.image || decodedtoken.picture} alt="No hay imagen" />
                <p>Name: {decodedtoken.name}</p>
                <p>Email: {decodedtoken.email}</p>
            </div>
        )
    };
