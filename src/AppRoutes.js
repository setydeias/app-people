import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './auth';
import Login from './pages/Login';
import Menu from './components/Menu';
import Dashboard from "./pages/Dashboard";
import LogOut from './pages/LogOut';
import ChangePassword from "./pages/ChangePassword";
import RecoverPassword from "./pages/RecoverPassword";

const AppRoutes = () => {

  return (
    <Router>        
      <Routes>
        <Route exact path="/" element={ <Login /> } />
        <Route exact path="/app/pessoa/usuario/senha/alterar/:user?/:password?/:iv?/:key?/:action?" element={ <ChangePassword /> } />
        <Route exact path="/app/pessoa/usuario/senha/redefinir/:id_people?/:document?/:iv?/:key?/:action?" element={ <RecoverPassword /> } />
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
 