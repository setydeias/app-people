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
import SupporContatc from '../../components/SupportContact';

const Login = (props) => { 
  
  const navigate = useNavigate();
  const { action, user, password, iv, key } = useParams();
  const [title, setTitle] = useState('');

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
  const [forcePasswordText, setFrcePasswordText] = useState('Senha fraca!');

  const [userLogin, setUser] = useState(()=> userDefault);
  
  const messageDefault = { text: '', supportContact: false }

  const [message, setMessage] = useState(messageDefault);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...userLogin, [name]: value });
    setMessage(messageDefault);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(messageDefault);
    try { 

      if(forcePassword){
        if(forcePasswordText === 'Senha forte'){
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
            setMessage({...message, text: 'Não foi possível validar a senha.'});
          }         
        }        
        setMessage({...message, text:'A senha informada não atende ao padrão. Favor verificar as regras de composição de senha acima.', supportContact: true});           
      }
    }            
    catch (error) {
      if (error.response.data.message === 'Informações inválidas') {
        setMessage({...message, text:'Código de confirmação inválido ou expeirado. Redefina em Esqueci minha senha. Dúvidas, favor entrar em contato: ', supportContact: true});
        return; 
      }
      if(error.message === 'Network Error') {
        setMessage({...message, text: 'Não foi possível a conexão com a API. Verifique sua conexão com a internet ou entre em contato: Setydeias (85) 3290-3496', supportContact: true});
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

  useEffect(()=> {
    if (action === '0') setTitle('Cadastrar senha');
    else setTitle('Redefinir senha');
  },[]);

  const testForcePassword = () => {

    var force = 0;	  
    const regex = /[0-9]/;

    if((userLogin.user_password_new.length >= 6) && (userLogin.user_password_new.match(/[a-z]+/))){
	  	force += 10;
	  }

	  if((userLogin.user_password_new.length >= 7) && (userLogin.user_password_new.match(/[A-Z]+/))){
	  	force += 20;
	  }

	  if((userLogin.user_password_new.length >= 8) && (userLogin.user_password_new.match(/[@#$%&!;*]/))){
	  	force += 20;
	  }

	  if(regex.test(userLogin.user_password_new)){
	  	force += 15;
	  }

    showForcePassword(force);
  }

  const showForcePassword = (force) => {

    referencces.userForcePassword.current.innerHTML = "";
    
    if(force < 30 ){
      referencces.userForcePassword.current.innerHTML = "<span style='color: #ac1515'>Senha fraca!</span>";
      setFrcePassword(false);
      setFrcePasswordText('Senha fraca!');
    }else if((force >= 30) && (force < 60)){
      setFrcePassword(false);
      setFrcePasswordText('Senha média');
      referencces.userForcePassword.current.innerHTML = "<span style='color: #fab027'>Senha média</span>";
    }else if((force >= 50) && (force < 70)){
      setFrcePassword(true);
      setFrcePasswordText('Senha forte');
      referencces.userForcePassword.current.innerHTML = "<span style='color: #105510'>Senha forte</span>";
    }
  }
 
  const testPassword = () => {

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
    if (userLogin.user_password_new.length != '' && userLogin.user_password_new.length < 8) {
      referencces.userForcePassword.current.innerHTML = "";
      setUser({
        ...userLogin,
        status: {
          password: {
            erro: 'A senha não pode ser menor que 8 caracteres.',
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
    testForcePassword();
    if(testLengthPassword() &&testPassword()){      
      if (forcePassword) {
        return true;
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
                  <label htmlFor="user_password_new_label">Senha {userLogin.user_password_new.length >0 ? userLogin.user_password_new.length : ''}</label>
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
                    onBlur={ testPasswordConfirm }
                    placeholder="user_password_confirm" 
                    required 
                  />
                  <label htmlFor="user_password_confirm_label">Confirmar {userLogin.user_password_confirm.length >0 ? userLogin.user_password_confirm.length : ''}</label>
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
                <div className="card-header"><i className="fa fa-check" aria-hidden="true"></i> Regras de composição da senha</div>
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
              message.text ? (
                <SupporContatc 
                  text={message.text}
                  supportContact={message.supportContact} 
                />
              ) : ''
            }           
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;