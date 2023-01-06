import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const AppRoutes = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Login /> } />
      </Routes>
    </Router>
  ) 
}

export default AppRoutes;
 