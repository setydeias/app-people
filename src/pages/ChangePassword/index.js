import React, { useState, useRef } from 'react';
import './styles.css';
import { Form, FormGroup, Button, Alert } from 'reactstrap';
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
    console.log(user.user_password_new);
    console.log(user.user_password_confirm);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try { 


       alert(testPassword());

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
 
  const testPassword = () => {
    if (user.user_password_new === '') {
      referencces.userPassword.current.focus();
      setUser({
        ...user,
        status: {
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
        password: {
          erro: '',
          validate: validateStatus.valide
        }
      }
    });
    return true;
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
            <p className='caption'>Crie uma senha de acesso a sua conta Setydeias</p>
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
                    onBlur={ testPassword }
                    placeholder="UserDocument" 
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
              </div>
              <div className="input-group has-validation">
                <span className="input-group-text"><i className="fas fa-id-card"></i></span>
                <div className="form-floating is-invalid">
                  <input 
                    type={ user.showPasswordConfirm ? 'text' : 'password' } 
                    className={user.status.passwordConfirm.validate} 
                    id="user_password_confirm" 
                    name='user_password_confirm' 
                    ref={ referencces.userPassword }
                    onChange={ handleChange }
                    onBlur={ ()=>{} }
                    placeholder="UserDocument" 
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
                 { user.status.password.erro }
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