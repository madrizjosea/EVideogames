import React from 'react';
import {Routes, Route} from "react-router-dom";
import Landing from './components/Landing/Landing';
import Main from './components/Main/Main';
import Navbar from './components/Navbar/NavBar';
import CreateUser from './components/CreateUser/CreateUser';
import Detalles from './components/Detalles/Detalles';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path={'/'} element={<Landing/>}></Route>
        <Route exact path={'/Main'} element={<><Navbar/><Main/></>}></Route>
        <Route exact path={'/CreateUser'} element={<><Navbar/><CreateUser/></>}></Route>
        <Route exact path={'/Detalles/:id'} element={<><Navbar/><Detalles/></>}></Route>
      </Routes>
    </div>
  );
}

export default App;
