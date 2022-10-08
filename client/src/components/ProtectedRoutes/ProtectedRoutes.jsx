import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const user = { loggedIn: document.cookie.length > 20 ? true : false };;
    return user && user.loggedIn;
};

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to='/Login'/>
}

export default ProtectedRoutes;