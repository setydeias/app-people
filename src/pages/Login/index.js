import React, { useState, useContext } from 'react';
import './style.css';
import { Form, FormGroup, Button, Alert } from 'reactstrap';
import Img from "../../assets/imgs/result.svg"

const Login = () => { 
  
  

  return(
    <div className="body">
      <div className="left-login">
        <img src={Img} alt="Pessoas olhando gráficos" className="chart" />
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
              <div class="input-group has-validation">
                <span class="input-group-text"><i className="fas fa-id-card"></i></span>
                <div class="form-floating is-invalid">
                  <input type="text" class="form-control is-invalid" id="floatingInputGroup2" placeholder="Username" required />
                  <label for="floatingInputGroup2">Digite seu CPF</label>
                </div>
                <div class="invalid-feedback">
                  Favor informar o CPF.
                </div>
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
            <Button 
              type='submit' 
              className='button'
            >
              Continuar                             
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;