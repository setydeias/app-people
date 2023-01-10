import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { Form, FormGroup, Button, Alert } from 'reactstrap';
import Img from "../../assets/imgs/Login01.jpg"
import { login } from '../../api/User';

const Login = (props) => { 
  
  var referencces = {
    userDocument: useRef(null),
    userPassword: useRef(null)
  }

  const validateStatus = {
    valide: 'form-control is-valid',
    invalide: 'form-control is-invalid',
    default: 'form-control'
  }

  const formStatusDefault = {
    erro: '',
    validate: validateStatus.default
  } 

  const userDefault = {
    user_document: '',
    user_password: '',
    valid_document: false,
    statusSpinner: false,
    status: {
      document: formStatusDefault,
      password: formStatusDefault
    }
  } 

  const [user, setUser] = useState(()=> userDefault);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {    
      
      if (testUserDocument()) {
        setUser({
          ...user,
          valid_document: true
        });
      }

    }            
    catch (error) {
            
    }
  }

  const testUserDocument = () => {
    
    console.log(user.user_document)

    if (user.user_document === '') {
      referencces.userDocument.current.focus();
      setUser({
        ...user,
        status: {
          document: {
            erro: 'Campo obrigatório!',
            validate: validateStatus.invalide
          }
        }
      });
      return false;
    }
    setUser({
      ...user,
      status: {
        document: {
          erro: '',
          validate: validateStatus.valide
        }
      }
    });
    return true;
  }

  const testUserPassword = () => {
    
  }

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
          <Form className="login-form" onSubmit={handleSubmit}>
            { 
              user.valid_document ? <>
                <h4>Digite sua senha</h4>                
                <div><b>CPF: </b> {user.user_document}</div><br/>
                <FormGroup>
                  <div className="input-group has-validation">
                    <span className="input-group-text"><i className="fas fa-lock"></i></span>
                    <div className="form-floating is-invalid">
                      <input 
                        type="passwords" 
                        className={ user.status.password.validate } 
                        id="user_password" 
                        name='user_password' 
                        ref={ referencces.userPassword }
                        onChange={ handleChange }
                        placeholder="UserPassword" 
                        required 
                      />
                      <label for="user-document">Senha</label>                  
                    </div>
                    <span className="input-group-text"><i className="fas fa-eye"></i></span>
                    <div className="invalid-feedback">
                      {user.status.password.erro}
                    </div>
                  </div>
                </FormGroup>
              </> 
              : <>
                <h3>Login</h3>
                <p className='caption'>Digite seu CPF para <b>criar</b> ou <b>acessar</b> sua conta Setydeias</p>
                <FormGroup>
                  <div className="input-group has-validation">
                    <span className="input-group-text"><i className="fas fa-id-card"></i></span>
                    <div className="form-floating is-invalid">
                      <input 
                        type="text" 
                        className={user.status.document.validate} 
                        id="user_document" 
                        name='user_document' 
                        ref={ referencces.userDocument }
                        onChange={ handleChange }
                        onBlur={ testUserDocument }
                        placeholder="UserDocument" 
                        required 
                      />
                      <label for="user-document">CPF</label>
                    </div>
                    <div className="invalid-feedback">
                     { user.status.document.erro }
                    </div>
                  </div>
                </FormGroup>                
              </>
            }
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