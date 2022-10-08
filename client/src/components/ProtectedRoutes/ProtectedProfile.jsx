import { Navigate, Outlet } from "react-router-dom";
//import jwtDecode from "jwt-decode";

const useAuth = () => {
    const user = { loggedIn: document.cookie.length>20 ? true : false };;
    return user && user.loggedIn;
};

const ProtectedProfile = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to='/login'/>
}

export default ProtectedProfile;