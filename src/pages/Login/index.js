import React, { useState, useContext } from 'react';
import './style.css';
import { Form, FormGroup, Button, Alert } from 'reactstrap';
import Img from "../../assets/imgs/result.svg"

const Login = (props) => { 
  
 
  return(
    <div className="body">
    <div className="left-login">
      <img src={Img} alt="Pessoas olhando gráficos" className="chart" />

    </div>

    <div className="right-login">
      <div className="card-login">
        <div className="user-links">
          <div className="user-link-home">
           
          </div>

          <div className="user-link-cad">
            
          </div>
        </div>
        <h1>LOGIN</h1>

          <Form className="login-form">
           
          </Form>

      </div>
    </div>
  </div>
  );

}

export default Login;