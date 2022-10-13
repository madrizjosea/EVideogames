import React, {useContext} from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { UserContext } from "../../Context/UserContext";
//import { useState } from "react";
//import { useLocalStorage } from "../../customhooks/useLocalStorage";
function getCookie(c_name) {
    if (document.cookie.length > 0) {
       let c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
           let c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
const cookie = getCookie('token')


if(cookie){
const verified = jwtDecode(cookie)
console.log('verified '+verified)
}else{
    console.log('cookie '+ document.cookie)
}


const useAuth = () => {
    const {value, setValue} = useContext(UserContext)
    console.log(setValue)
    console.log(value.role)
    const user = { loggedIn: value.role === 'admin' ? true : false };;
    return user && user.loggedIn;
};

const ProtectedDasboard = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to='/login'/>
}

export default ProtectedDasboard;