import React, { useState, useContext } from 'react';
import './style.css';
import { Form, FormGroup, Button, Alert } from 'reactstrap';
import Img from "../../assets/imgs/result.svg"

const Login = () => { 
  
 
  return(
    <div className="body">
    <div className="left-login">
      <img src="" alt="Pessoas olhando gráficos" className="chart" />
      <>Setydeias Cadastro único</>
    </div>

    <div className="right-login">
      <div className="card-login">
        <div className="user-links">
          <div className="user-link-home">
           
          </div>

          <div className="user-link-cad">
            
          </div>
        </div>
        <h1></h1>

          <Form className="login-form">
          <FormGroup>         
                        <div className="input-group flex-nowra">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-user"></i></span>
                            <input type='text' id='description_user' name='description_user' className='form-control'   placeholder='Digite seu CPF' />
                        </div>
                     </FormGroup>
                     <FormGroup>

                         <div className="input-group flex-nowra">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock"></i></span>
                            <input type='text' id='password_user' name='password_user' className='form-control'  placeholder='Informe a senha' />
                            <span 
                                 type="button" 
                                 className="input-group-text" 
                                 id="basic-addon1"
                                 
                             >
                                 <i className='fas fa-eye'></i>
                             </span>
                         </div> 
                     </FormGroup>
          </Form>

      </div>
    </div>
  </div>
  );

}

export default Login;