import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './auth';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";

const AppRoutes = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Login /> } />
        <Route exact path="/dashboard" element={ 
            <PrivateRoute>
              <Dashboard /> 
            </PrivateRoute>
          } />
      </Routes>
    </Router>
  ) 
}

export default AppRoutes;
 