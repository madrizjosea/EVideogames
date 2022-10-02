import React from 'react';
import {Routes, Route} from "react-router-dom";
import Landing from './components/Landing/Landing';
import Main from './components/Main/Main'
import Navbar from './components/Navbar/NavBar';
import CreateUser from './components/CreateUser/CreateUser';
import Details from './components/Details/Details'

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
