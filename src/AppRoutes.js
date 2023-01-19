import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import PrivateRoute from './auth';
import { AuthContext } from './provider/authProviderMenu';
import Menu from './components/Menu';


const AppRoutes = () => {

  const menuShow = useContext(AuthContext);

  return (
    <Router>
         {menuShow.menuShow ? <Menu /> : ''}
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
 