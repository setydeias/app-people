import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './auth';
import Login from './pages/Login';
import Menu from './components/Menu';
import Dashboard from "./pages/Dashboard";
import LogOut from './pages/LogOut';

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
        <Route exact path="/logout" element={ 
             <PrivateRoute>
               <LogOut /> 
             </PrivateRoute>
          } />
      </Routes>
    </Router>
  ) 
}

export default AppRoutes;
 