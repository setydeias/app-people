import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import { Form, FormGroup, Button, Alert, Container } from 'reactstrap';
import Img from "../../assets/imgs/Login01.jpg";
import { login, passwordValidation, passwordUpdate } from '../../api/User';
import Spinner from '../../components/Spinner';
import { clearForm } from '../../utilities/Validations';
import { useNavigate } from 'react-router-dom';
import { decrypt } from '../../utilities/Cryptography';

const Login = (props) => { 
  
  const navigate = useNavigate();
  const { user, password, iv, key } = useParams();
  const [title, setTitle] = useState('Cadastrar senha');

  const dataParamsLink = {
    iv: iv,
    key: new Uint8Array(Buffer.from(key,'hex')),
    encryptedData: user
  }

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
    user_document: user,
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

  const [forcePassword, setFrcePassword] = useState(() => false);

  const [userLogin, setUser] = useState(()=> userDefault);
  const [message, setMessage] = useState(() => '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...userLogin, [name]: value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try { 

      if(forcePassword){
        
        const cpf = decrypt(dataParamsLink);
        
        const validationPassword = await passwordValidation({
          document: cpf,
          password: password
        });

        if (validationPassword.status === 200) {
          
          const updatePasswor = await passwordUpdate({
            document: cpf,
            password: userLogin.user_password_new
          });

         if (updatePasswor.status === 200) {
            const resp = await login({ document: cpf, password_user: userLogin.user_password_new }); 
            if (resp.status === 200) {                          
              localStorage.setItem('token', resp.data.access_token);
              localStorage.setItem('document', resp.data.people.document)
              navigate("/dashboard");
              return;
            }
          }
          setMessage('Não foi possível validar a senha.');
        }
      }
     
    }            
    catch (error) {
      if (error.message === 'Request failed with status code 401') {
        setMessage(error);
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
    setUser({ ...userLogin, showPassword : !userLogin.showPassword });
  }

  const handleShowPasswordComfirm = (e) => {
    e.preventDefault();
    setUser({ ...userLogin, showPasswordConfirm : !userLogin.showPasswordConfirm });
  }


  const testForcePassword = () => {

    var force = 0;
	  
    
	  if((userLogin.user_password_new.length >= 6) && (userLogin.user_password_new.match(/[a-z]+/))){
	  	force += 10;
	  }

	  if((userLogin.user_password_new.length >= 6) && (userLogin.user_password_new.match(/[A-Z]+/))){
	  	force += 20;
	  }

	  if((userLogin.user_password_new.length >= 8) && (userLogin.user_password_new.match(/[@#$%&!;*]/))){
	  	force += 25;
	  }

	  if(userLogin.user_password_new.match(/([1-9]+)\1{1,}/)){
	  	force += -25;
	  }

    showForcePassword(force);
  }

  const showForcePassword = (force) => {

    referencces.userForcePassword.current.innerHTML = "";
    
    if(force < 30 ){
      referencces.userForcePassword.current.innerHTML = "<span style='color: #ac1515'>Senha Fraca!</span>";
      setFrcePassword(false);
    }else if((force >= 30) && (force < 50)){
      setFrcePassword(false);
      referencces.userForcePassword.current.innerHTML = "<span style='color: #fab027'>Senha Média</span>";
    }else if((force >= 50) && (force < 70)){
      setFrcePassword(true);
      referencces.userForcePassword.current.innerHTML = "<span style='color: #105510'>Senha Forte</span>";
    }
  }
 
  const testPassword = () => {

    testForcePassword();
    
    if (testLengthPassword() && userLogin.user_password_new === '') {
      referencces.userForcePassword.current.innerHTML = "";
      referencces.userPassword.current.focus(); 
      setUser({
        ...userLogin,
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
      ...userLogin,
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
    if(userLogin.user_password_confirm != userLogin.user_password_new){
      setFrcePassword(false);
      setUser({
        ...userLogin,
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
    setFrcePassword(true);
    setUser({
      ...userLogin,
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
    if (userLogin.user_password_new.length != '' && userLogin.user_password_new.length < 6) {
      referencces.userForcePassword.current.innerHTML = "";
      setFrcePassword(false);
      setUser({
        ...userLogin,
        status: {
          password: {
            erro: 'A Senha não pode ser menor que 6 caracteres.',
            validate: validateStatus.invalide
          },
          passwordConfirm: formStatusDefault
        }
      });
      return false;
    }
    setUser({
      ...userLogin,
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
            <h3>{ title }</h3>
            <p className='caption'>Crie uma senha de acesso a sua conta Setydeias.</p>
            <FormGroup>
              <div className="input-group has-validation">
                <span className="input-group-text"><i className="fas fa-lock caption"></i></span>
                <div className="form-floating is-invalid">
                  <input 
                    type={ userLogin.showPassword ? 'text' : 'password' }
                    className={userLogin.status.password.validate} 
                    id="user_password_new" 
                    name='user_password_new' 
                    ref={ referencces.userPassword }
                    onChange={ handleChange }
                    onBlur={ validPassword }
                    autoFocus={true}
                    placeholder="user_password_new" 
                    required 
                  />
                  <label for="user_password_new_label">Senha {userLogin.user_password_new.length >0 ? userLogin.user_password_new.length : ''}</label>
                </div>
                <span 
                  type="button"
                  className="input-group-text"
                  onClick={(e) => handleShowPassword(e)}
                >
                  <i className="fas fa-eye caption"></i>
                </span>
                <div className="invalid-feedback">
                 { userLogin.status.password.erro }
                </div>
                <div ref={referencces.userForcePassword}></div>
              </div>
              <div className="input-group has-validation">
                <span className="input-group-text"><i className="fas fa-key caption"></i></span>
                <div className="form-floating is-invalid">
                  <input 
                    type={ userLogin.showPasswordConfirm ? 'text' : 'password' } 
                    className={userLogin.status.passwordConfirm.validate} 
                    id="user_password_confirm" 
                    name='user_password_confirm' 
                    ref={ referencces.userPasswordConfirm }
                    onChange={ handleChange }
                    onBlur={ validPassword }
                    placeholder="user_password_confirm" 
                    required 
                  />
                  <label for="user_password_confirm_label">Confirmar {userLogin.user_password_confirm.length >0 ? userLogin.user_password_confirm.length : ''}</label>
                </div>
                <span 
                  type="button"
                  className="input-group-text"
                  onClick={(e) => handleShowPasswordComfirm(e)}
                >
                  <i className="fas fa-eye caption"></i>
                </span>
                <div className="invalid-feedback">
                 { userLogin.status.passwordConfirm.erro }
                </div>
              </div>
              <div className="card border-none mb-3" style={{'max-width': '18rem;'}}>
                <div className="card-header"><i className="fa fa-check" aria-hidden="true"></i> Dica de senha FORTE</div>
                <div className="card-body text-secondary shadow-lg">
                  <p className="card-text" style={{'margin': '0'}}>01. Conter no mínimo 8 caracteres.</p>
                  <p className="card-text" style={{'margin': '0'}}>02. Conter letra maiúscula.</p>
                  <p className="card-text" style={{'margin': '0'}}>03. Conter letra minúscula.</p>
                  <p className="card-text" style={{'margin': '0'}}>03. Conter dígito.</p>
                  <p className="card-text" style={{'margin': '0'}}>04. Conter caractere especial. Ex.: @#$%&!;*</p>
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