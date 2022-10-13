import React, {useContext} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
//import jwtDecode from "jwt-decode";

const useAuth = () => {
    const {value, setValue} = useContext(UserContext)
    console.log(setValue)
    const user = { loggedIn: value ? true : false };;
    return user && user.loggedIn;
};


const ProtectedProfile = () => {
    
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to='/Login'/>
}

export default ProtectedProfile;