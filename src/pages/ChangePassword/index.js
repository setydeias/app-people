import React, { useState, useRef } from 'react';
import './styles.css';
import { Form, FormGroup, Button, Alert, Container } from 'reactstrap';
import Img from "../../assets/imgs/Login01.jpg";
import { login } from '../../api/User';
import Spinner from '../../components/Spinner';
import { clearForm } from '../../utilities/Validations';
import { useNavigate } from 'react-router-dom';
import { decrypt } from '../../utilities/Cryptography';

const Login = (props) => { 
  
  const navigate = useNavigate();

  var referencces = {
    userPassword: useRef(null),
    userPasswordConfirm: useRef(null),
    userForcePassword: useRef(null)
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
    user_password_new: '',
    user_password_confirm: '',
    showPassword: false,
    showPasswordConfirm: false,
    statusSpinner: false,
    status: {
      password: formStatusDefault,
      passwordConfirm: formStatusDefault,
    }
  } 


  const [user, setUser] = useState(()=> userDefault);
  const [message, setMessage] = useState(() => '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try { 

      console.log(`Senha: ${user.user_password_new} Confirme: ${user.user_password_confirm}`);

      if(validPassword()){
        alert('Senha validada!');
        return;
      }
      alert('Erro ao validar senha!');

      /*
         const resp = await login({ document: user.user_document, password_user: user.user_password }); 
            if (resp.status === 200) {              
              console.log(resp.data);              
              localStorage.setItem('token', resp.data.access_token);
              localStorage.setItem('document', resp.data.people.document)
              navigate("/dashboard");
              return;
            }
      */
      
    }            
    catch (error) {
      if (error.message === 'Request failed with status code 401') {
        setMessage('Usuário ou senha inválidos.');
        return; 
      }
      if(error.message === 'Network Error') {
        setMessage('Não foi possível a conexão com a API. Verifique sua conexão com a internet ou entre em contato: Setydeias (85) 3290-3496');
        return; 
      }
    }
  }

  const handleShowPassword = (e) => {
    e.preventDefault();
    setUser({ ...user, showPassword : !user.showPassword });
  }

  const handleShowPasswordComfirm = (e) => {
    e.preventDefault();
    setUser({ ...user, showPasswordConfirm : !user.showPasswordConfirm });
  }

  const testForcePassword = () => {

    var force = 0;
	  
	  if((user.user_password_new.length >= 4) && (user.user_password_new <= 7)){
	  	force += 10;
	  }else if(user.user_password_new.length > 7){
	  	force += 25;
	  }

	  if((user.user_password_new.length >= 5) && (user.user_password_new.match(/[a-z]+/))){
	  	force += 10;
	  }

	  if((user.user_password_new.length >= 6) && (user.user_password_new.match(/[A-Z]+/))){
	  	force += 20;
	  }

	  if((user.user_password_new.length >= 7) && (user.user_password_new.match(/[@#$%&;*]/))){
	  	force += 25;
	  }

	  if(user.user_password_new.match(/([1-9]+)\1{1,}/)){
	  	force += -25;
	  }

    showForcePassword(force);
  }

  const showForcePassword = (force) => {

    referencces.userForcePassword.current.innerHTML = "";
    
    if(force < 30 ){
      referencces.userForcePassword.current.innerHTML = "<span style='color: #790505'>Senha Fraca!</span>";
    }else if((force >= 30) && (force < 50)){
      referencces.userForcePassword.current.innerHTML = "<span style='color: #fab027'>Senha Média</span>";
    }else if((force >= 50) && (force < 70)){
      referencces.userForcePassword.current.innerHTML = "<span style='color: #105510'>Senha Forte</span>";
    }else if((force >= 70) && (force < 100)){
      referencces.userForcePassword.current.innerHTML = "<span style='color: #0c270c'>Senha Excelente</span>";
    }
  }
 
  const testPassword = () => {

    testForcePassword();
    
    if (testLengthPassword() && user.user_password_new === '') {
      referencces.userPassword.current.focus(); 
      setUser({
        ...user,
        status: {
          password: {
            erro: 'Senha inválida!',
            validate: validateStatus.invalide
          },
          passwordConfirm: formStatusDefault
        }
      });
      return false;
    }
    setUser({
      ...user,
      status: {
        password: {
          erro: '',
          validate: validateStatus.valide
        },
        passwordConfirm: formStatusDefault
      }
    });
    return true;
  }

  const testPasswordConfirm = () => {
    if(user.user_password_confirm != user.user_password_new){
      setUser({
        ...user,
        status: {
          passwordConfirm: {
            erro: 'Senhas divergentes!',
            validate: validateStatus.invalide
          },
          password:  {
            erro: '',
            validate: validateStatus.invalide
          }
        }
      });
      return false;
    }
    setUser({
      ...user,
      status: {
        passwordConfirm: {
          erro: '',
          validate: validateStatus.valide
        },
        password: {
          erro: '',
          validate: validateStatus.valide
        }
      }
    });
    return true; 
  }

  const testLengthPassword = () => {
    if (user.user_password_new.length < 6) {
      referencces.userForcePassword.current.innerHTML = "";
      setUser({
        ...user,
        status: {
          password: {
            erro: 'A Senhas não pode ser menor que 6 caracteres.',
            validate: validateStatus.invalide
          },
          passwordConfirm: formStatusDefault
        }
      });
      return false;
    }
    setUser({
      ...user,
      status: {
        password: {
          erro: '',
          validate: validateStatus.valide
        },
        passwordConfirm: formStatusDefault
      }
    });
    return true;
  }
  
  const validPassword = () => {
    if(testLengthPassword()){
      if (testPassword() && testPasswordConfirm()) {
        return true
      }
    }    
    return false;
  }

  return(
    <div className="body">
      <div className="left-login">
        <img src={''} alt="Pessoas olhando gráficos" className="chart" />
        <>Setydeias Cadastro único</>
      </div>
      <div className="right-login">
        <div className="card-login">
          <Form className="login-form" onSubmit={ handleSubmit }>
            <h3>Cadastrar senha</h3>
            <p className='caption'>Crie uma senha de acesso a sua conta Setydeias contendo no mínimo 6 caracteres.</p>
            <FormGroup>
              <div className="input-group has-validation">
                <span className="input-group-text"><i className="fas fa-id-card"></i></span>
                <div className="form-floating is-invalid">
                  <input 
                    type={ user.showPassword ? 'text' : 'password' }
                    className={user.status.password.validate} 
                    id="user_password_new" 
                    name='user_password_new' 
                    ref={ referencces.userPassword }
                    onChange={ handleChange }
                    onBlur={ validPassword }
                    placeholder="" 
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
                 { user.status.password.erro }
                </div>
                <div ref={referencces.userForcePassword}></div>
              </div>
              <div className="input-group has-validation">
                <span className="input-group-text"><i className="fas fa-id-card"></i></span>
                <div className="form-floating is-invalid">
                  <input 
                    type={ user.showPasswordConfirm ? 'text' : 'password' } 
                    className={user.status.passwordConfirm.validate} 
                    id="user_password_confirm" 
                    name='user_password_confirm' 
                    ref={ referencces.userPasswordConfirm }
                    onChange={ handleChange }
                    onBlur={ validPassword }
                    placeholder="" 
                    required 
                  />
                  <label for="user-document">Confirmar</label>
                </div>
                <span 
                  type="button"
                  className="input-group-text"
                  onClick={(e) => handleShowPasswordComfirm(e)}
                >
                  <i className="fas fa-eye"></i>
                </span>
                <div className="invalid-feedback">
                 { user.status.passwordConfirm.erro }
                </div>
              </div>
            </FormGroup>                
            <Button 
              type='submit' 
              className='button-continuar'
            >
              Continuar                                             
            </Button> 
            {    
              message ? (
                <Alert color='danger'>{ message }</Alert>
              ) : ''
            }           
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;