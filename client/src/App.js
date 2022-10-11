import React from 'react';
import {Routes, Route} from "react-router-dom";
import Landing from './components/Landing/Landing.jsx';
import Main from './components/Main/Main.jsx'
import Navbar from './components/Navbar/NavBar.jsx';
import CreateUser from './components/CreateUser/CreateUser.jsx';
import Details from './components/Details/Details.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route exact path={'/'} element={<Landing/>}></Route>
        <Route exact path={'/Main'} element={<><Navbar/><Main/></>}></Route>
        <Route exact path={'/CreateUser'} element={<><Navbar/><CreateUser/></>}></Route>
        <Route exact path={'/Details/:id'} element={<><Navbar/><Details/></>}></Route>
      </Routes>
    </div>
  );
}

export default App;
