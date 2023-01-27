import React, { useState, useRef } from 'react';
import './style.css';
import { Form, FormGroup, Button, Alert } from 'reactstrap';
import Img from "../../assets/imgs/Login01.jpg"
import { login, getUserForDescription, registerUser } from '../../api/User';
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
import { useNavigate } from 'react-router-dom';
import ModalAlert from '../../components/Modal/Alert';
import { encrypt } from '../../utilities/Cryptography';
import AppPeople from '../../globals/Endpoint/app_people';
import { sendUserRegistrationConfirmation } from '../../api/notification/email';
 
const Login = (props) => { 
  
  const navigate = useNavigate();

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

  const modalDefault = { 
    modal: false, 
    title: '', 
    text: '', 
  }

  const [modal, setModal] = useState(modalDefault);
  const toggle = () => setModal(!modal);

  const userDefault = {
    user_document: '',
    user_password: '',
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

  const dataEmailDefault = {
    email: '',
    password: '',
    iv: '',
    key: '',
    encryptedData: '',
    endpoint: ''
  }

  const [user, setUser] = useState(()=> userDefault);
  const [message, setMessage] = useState(() => '');
  const [dataEmail, setDataEmail] = useState(() => dataEmailDefault);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setMessage('');
};

  const handleChangeMaskCPF = (e) => { 
    e.preventDefault();
    maskCPF(e);
    setUser({ ...user, [e.target.name]: noMask(e.target.value) });
    setMessage('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try { 

      if (testUserDocument()) {		
		
        const resultGetDescription = await getUserForDescription({ document: user.user_document }).then();
  
        if(resultGetDescription.status === 200) { 
          
          setUser({
            ...user,
            valid_document: true,
          });
          
          if (testUserPassword()) {

            const resp = await login({ document: user.user_document, password_user: user.user_password }); 
            if (resp.status === 200) {              
              console.log(resp.data);              
              localStorage.setItem('token', resp.data.access_token);
              localStorage.setItem('document', resp.data.people.document)
              navigate("/dashboard");
              return;
            }
          }
        }

        if(resultGetDescription.status === 204) {
          setUser((prevent) => ({
            ...prevent,
            notRegistered: true,
          }));

         if (testUserEmail()) {
            const responseRegister = await registerUser({
              "id_status": 1,
              "id_document_type": 1,
              "document": user.user_document,
              "name": null,
              "usual_name": null,
              "birth_date": null,
              "sexo": 1,
              "id_treatment": 4,
              "date_registration": "2023-01-26 14:20:44",
              "last_change": null,
              "id_adress_type" : 35, 
              "adress": null, 
              "address_number": null, 
              "city": null, 
              "uf": "CE", 
              "address_complement": null, 
              "district":null, 
              "cep": null, 
              "contacts": [
                {
                  "id_contact_type": 2,
                  "contact": user.user_email,
                  "whatsapp": 0,
                  "main": 1
                }
              ]		
            });

            if (responseRegister.status === 201) {

              const dataCrypto = encrypt(user.user_document);
              
              const responseSendEmail = await sendUserRegistrationConfirmation({
                email: user.user_email,
                password: responseRegister.data.pessoaCadastrada.password_user,
                iv: dataCrypto.iv,
                key: dataCrypto.key,
                encryptedData: dataCrypto.encryptedData,
                endpoint: AppPeople.settings.endpoint_change_password
              });
              
              if (responseSendEmail.status === 200) {
                setModal((prevent) => ({
                  ...prevent,
                  modal: true,
                  title: responseRegister.data.message,
                  text: `E-mail de confirmação enviado para: ${user.user_email}. Favor vericicar sua caixa de entrada ou span.`
                }));
                setUser(()=> userDefault);
                clearForm();
              }              
            }
          } 
        }      
      }      
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
                        autoFocus
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
            {    
              message ? (
                <Alert color='danger'>{ message }</Alert>
              ) : ''
            }           
          </Form>
          <ModalAlert 
            modal={ modal} 
            toggle={ toggle }
          /> 
        </div>
      </div>
    </div>
  );
}

export default Login;