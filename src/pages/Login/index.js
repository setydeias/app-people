import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { Form, FormGroup, Button, Alert } from 'reactstrap';
import Img from "../../assets/imgs/Login01.jpg"
import { login, getUserForDescription } from '../../api/User';
import Spinner from '../../components/Spinner';
import { 
  noMask, 
  maskCPF, 
  setMaskCPF,
} from '../../utilities/Masks';
import { 
  isValidCPF,
  isValidEMail,
  clearForm
} from '../../utilities/Validations';
 
const Login = (props) => { 
  
  var referencces = {
    userDocument: useRef(null),
    userDocumentRegistration: useRef(null),
    userPassword: useRef(null),
    userEmil: useRef(null),
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
    user_password: '123456',
    user_email: '',
    valid_document: false,
    statusSpinner: false,
    statusPassword: false,
    notRegistered: false,
    status: {
      document: formStatusDefault,
      password: formStatusDefault,
      email: formStatusDefault,
    }
  } 

  const [user, setUser] = useState(()=> userDefault);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
};

  const handleChangeMaskCPF = (e) => { 
    e.preventDefault();
    maskCPF(e);
    setUser({ ...user, [e.target.name]: noMask(e.target.value) });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try { 

      if (testUserDocument()) {

        const resultGetDescription = await getUserForDescription({ document: user.user_document });

        if(resultGetDescription.status === 200) { 
          setUser({
            ...user,
            valid_document: true,
          });
          return;     
        }
        if(resultGetDescription.status === 204) {
          setUser({
            ...user,
            notRegistered: true,
          });
        }        
      }
    }            
    catch (error) {
      console.log(error.message);
    }
  }

  const handleShowPassword = (e) => {
    e.preventDefault();
    setUser({ ...user, statusPassword : !user.statusPassword });
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
          },
          password: formStatusDefault,
          email: formStatusDefault
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
        },
        password: formStatusDefault,
        email: formStatusDefault
      }
    });
    return true;
  }

  const testUserEmail = () => {    
    
    if ((user.user_email === '') || (!isValidEMail(user.user_email))) {
      referencces.userEmil.current.focus();
      setUser({
        ...user,
        status: {
          email: {
            erro: 'E-mail invalido!',
            validate: validateStatus.invalide
          },
          password: formStatusDefault,
          document: formStatusDefault
        }
      });
      return false;
    }
    setUser({
      ...user,
      status: {
        email: {
          erro: '',
          validate: validateStatus.valide
        },
        password: formStatusDefault,
        document: formStatusDefault
      }
    });
    return true;
  }

  const testUserPassword = () => {
    if(user.user_password === '') {
      referencces.userPassword.current.focus();
      setUser({
        ...user,
        status: {
          document: formStatusDefault,
          password: {
            erro: 'Senha inválida!',
            validate: validateStatus.invalide
          }
        }
      });
      return false;
    }
    setUser({
      ...user,
      status: {
        document: formStatusDefault,
        password: {
          erro: '',
          validate: validateStatus.valide
        }
      }
    });
    return true;
  }

  const cancel = () => {
    setUser(() => userDefault);
    clearForm();
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
              user.notRegistered ? <>              
                <h3>Cadastro inicial</h3>
                <p className='caption'>Você não possui uma conta Setydeias, vamos <b>criar</b>?</p>
                <FormGroup>
                  <div className="input-group has-validation">
                    <span className="input-group-text"><i className="fas fa-id-card"></i></span>
                    <div className="form-floating is-invalid">
                      <input 
                        type="text" 
                        className={user.status.document.validate} 
                        id="user_document_registration" 
                        name='user_document' 
                        ref={ referencces.userDocumentRegistration }
                        onChange={ handleChangeMaskCPF }
                        onBlur={ testUserDocument }
                        value={ setMaskCPF(user.user_document) }
                        required 
                      />
                      <label for="user-document">CPF</label>
                    </div>
                    <div className="invalid-feedback">
                     { user.status.document.erro }
                    </div>
                  </div>
                  <div className="input-group has-validation">
                    <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                    <div className="form-floating is-invalid">
                      <input 
                        type="text" 
                        className={user.status.email.validate} 
                        id="user_email" 
                        name='user_email' 
                        ref={ referencces.userEmil }
                        onChange={ handleChange }
                        onBlur={ testUserEmail }
                        required 
                      />
                      <label for="user-document">E-mail</label>
                    </div>
                    <div className="invalid-feedback">
                     { user.status.email.erro }
                    </div>
                  </div>                  
                </FormGroup>
                <Button 
                type='button' 
                className='button-cancelar'
                onClick={ cancel }
              >
                Cancelar                               
              </Button>
              </> 
              
              :
              user.valid_document ? <>
                <h4>Digite sua senha</h4>                
                <div><b>CPF: </b> { setMaskCPF(user.user_document)}</div><br/>
                <FormGroup>
                  <div className="input-group has-validation">
                    <span className="input-group-text"><i className="fas fa-lock"></i></span>
                    <div className="form-floating is-invalid">
                      <input 
                        type={ user.statusPassword ? 'text' : 'password' } 
                        className={ user.status.password.validate } 
                        id="user_password" 
                        name='user_password' 
                        ref={ referencces.userPassword }
                        onChange={ handleChange }
                        onBlur={ testUserPassword }
                        placeholder="UserPassword" 
                        required 
                      />
                      <label for="user-document">Senha</label>                  
                    </div>
                    <span 
                      type="button"
                      className="input-group-text"
                      onClick={(e) => handleShowPassword(e)}
                    >
                      <i className="fas fa-eye"></i>
                    </span>
                    <div className="invalid-feedback">
                      {  user.status.password.erro }
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
            <Button 
              type='submit' 
              className='button-continuar'
            >
              { user.valid_document ? 'Entrar' : 'Continuar' }                               
            </Button>
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
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;