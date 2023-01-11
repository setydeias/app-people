import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { Form, FormGroup, Button, Alert } from 'reactstrap';
import Img from "../../assets/imgs/Login01.jpg"
import { login } from '../../api/User';
import Spinner from '../../components/Spinner';
import { noMask, maskCPF, setMaskCPF } from '../../utilities/Masks';
import { isValidCPF } from '../../utilities/Validations';
 
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
    statusSpinner: true,
    status: {
      document: formStatusDefault,
      password: formStatusDefault
    }
  } 

  const [user, setUser] = useState(()=> userDefault);
  
  const handleChangeMaskCPF = (e) => { 
    e.preventDefault();
    maskCPF(e);
    setUser({ ...user, [e.target.name]: noMask(e.target.value) });
  }

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
    
    if ((user.user_document === '') || (!isValidCPF(user.user_document))) {
      referencces.userDocument.current.focus();
      setUser({
        ...user,
        status: {
          document: {
            erro: 'CPF invalido!',
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

  const cancel = () => {
    setUser(() => userDefault);
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
                <div><b>CPF: </b> { setMaskCPF(user.user_document)}</div><br/>
                <FormGroup>
                  <div className="input-group has-validation">
                    <span className="input-group-text"><i className="fas fa-lock"></i></span>
                    <div className="form-floating is-invalid">
                      <input 
                        type="password" 
                        className={ user.status.document.validate } 
                        id="user_password" 
                        name='user_password' 
                        ref={ referencces.userPassword }
                        onChange={ ()=>{} }
                        placeholder="UserPassword" 
                        required 
                      />
                      <label for="user-document">Senha</label>                  
                    </div>
                    <span className="input-group-text"><i className="fas fa-eye"></i></span>
                    <div className="invalid-feedback">
                      {  user.status.document.erro }
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
                        onChange={ handleChangeMaskCPF }
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
            {
              user.valid_document ?
              <Button 
                type='button' 
                className='button-cancelar'
                onClick={ cancel }
              >
                Cancelar                               
              </Button> : ''
            }
            <Button 
              type='submit' 
              className='button-continuar'
            >
              { user.valid_document ? 'Entrar' : 'Continuar' }                               
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;