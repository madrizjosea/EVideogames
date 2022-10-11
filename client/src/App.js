import React from 'react';
import { Routes, Route } from "react-router-dom";
import Landing from './components/Landing/Landing.jsx';
import Main from './components/Main/Main.jsx'
import Navbar from './components/Navbar/NavBar.jsx';
import CreateUser from './components/CreateUser/CreateUser.jsx';
import Details from './components/Details/Details.jsx'
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import AddGame from './components/AddGame/AddGame.jsx';
import { UserContext } from './Context/UserContext.js';
import { useLocalStorage } from './customhooks/useLocalStorage'
import ProtectedDashboard from './components/ProtectedRoutes/ProtectedDashboard'
import ProtectedProfile from './components/ProtectedRoutes/ProtectedProfile.jsx';
import Profile from './components/ProfileClient/ProfileCliente.jsx';
import Cart from './components/Cart/Cart.jsx';

function App() {
 const [value, setValue] = useLocalStorage('user', '')
 const [cart, setCart] = useLocalStorage('cart', [])
  return (
    <div>
      <UserContext.Provider value={{value, setValue, cart, setCart}}>
      <Routes>
        <Route exact path={'/'} element={<Landing/>}></Route>
        <Route exact path={'/Main'} element={<><Navbar/><Main/></>}></Route>
        <Route exact path={'/CreateUser'} element={<><Navbar/><CreateUser/></>}></Route>
        <Route exact path={'/Details/:id'} element={<><Navbar/><Details/></>}></Route>
        <Route exact path={'/Login'} element={<><Navbar/><Login/></>}></Route>
        <Route exact path={'/Cart'} element={<><Navbar/><Cart/></>}></Route>
        <Route element={<ProtectedDashboard/>}>
        <Route exact path={'/Dashboard'} element={<><Navbar/><Dashboard/></>}></Route>
        <Route exact path={'/AddGame'} element={<><Navbar /><AddGame /></>}></Route>
        </Route>
        <Route element={<ProtectedProfile/>}>
        <Route exact path={'/Profile'} element={<><Navbar/><Profile/></>}></Route>
        </Route>
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
