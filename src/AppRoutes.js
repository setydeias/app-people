import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import PrivateRoute from './auth';
import Menu from './components/Menu';

const AppRoutes = () => {

  return (
    <Router>        
      <Routes>
        <Route exact path="/" element={ <Login /> } />
        <Route exact path="/dashboard" element={ 
            <PrivateRoute>
              <Menu />
              <Dashboard /> 
            </PrivateRoute>
          } />
      </Routes>
    </Router>
  ) 
}

export default AppRoutes;
 