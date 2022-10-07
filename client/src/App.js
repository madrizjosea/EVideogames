import React from 'react';
import {Routes, Route} from "react-router-dom";
import Landing from './components/Landing/Landing.jsx';
import Main from './components/Main/Main.jsx'
import Navbar from './components/Navbar/NavBar.jsx';
import CreateUser from './components/CreateUser/CreateUser.jsx';
import Details from './components/Details/Details.jsx'
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx';
import { UserContext } from './Context/UserContext.js';
import { useLocalStorage } from './customhooks/useLocalStorage'

function App() {
 const [value, setValue] = useLocalStorage('user', '')

  return (
    <div>
      <UserContext.Provider value={{value, setValue}}>
      <Routes>
        <Route exact path={'/'} element={<Landing/>}></Route>
        <Route exact path={'/Main'} element={<><Navbar/><Main/></>}></Route>
        <Route exact path={'/CreateUser'} element={<><Navbar/><CreateUser/></>}></Route>
        <Route exact path={'/Details/:id'} element={<><Navbar/><Details/></>}></Route>
        <Route exact path={'/Login'} element={<><Navbar/><Login/></>}></Route>
        <Route element={<ProtectedRoutes/>}>
        <Route exact path={'/Dashboard'} element={<><Navbar/><Dashboard/></>}></Route>
        </Route>
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
