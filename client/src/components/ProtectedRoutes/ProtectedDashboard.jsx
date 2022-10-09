import React, {useContext} from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { UserContext } from "../../Context/UserContext";
//import { useState } from "react";
//import { useLocalStorage } from "../../customhooks/useLocalStorage";
if(document.cookie.length>20){
const token = document.cookie.replace('token=', '')
const verified = jwtDecode(token)
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