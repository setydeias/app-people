import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, FormGroup } from "reactstrap";
import './styles.css';
import { decrypt } from "../../utilities/Cryptography";
import { omitEmail } from '../../utilities/Masks';
import { passwordUpdate } from '../../api/User';
import { getContactsbyIdPeople } from "../../api/People";
import { sendUserRecoverPassword, sendUserRegistrationConfirmation } from "../../api/notification/email";
import AppPeople from "../../globals/Endpoint/app_people";

const RecoverPassword = () => {

  const { action, id_people, document, iv, key } = useParams();
  const navigate = useNavigate();
  const dataParamsLink = {
    iv: iv,
    key: new Uint8Array(Buffer.from(key,'hex')),
    encryptedData: document
  }

  const statusButtonDefault = {
    text: 'Redefinir',
    status: false
  }
  
  const emailDefault = {
    omit: '',
    noOmit: ''
  }

  const [title, setTitle] = useState('');
  const [statusButton, setStatusButton] = useState(statusButtonDefault);
  const [information, setInformation] = useState('Para proteger sua conta Setydeias, será enviado um e-mail de confirmação para');
  const [contact, setContact] = useState([]);
  const [email, setEmail] = useState(emailDefault);
  const documentDecrypt = decrypt(dataParamsLink);   
  
  const getContactsbyId = async () => {
    const result = await getContactsbyIdPeople(id_people);
    if (result.status === 200) {
      setEmail({
        ...email,
        omit: omitEmail(result.data.contacts[0].contact),
        noOmit: result.data.contacts[0].contact
      })
    }
  }

  const sendEmail = async (e) => {
    e.preventDefault();
   
    if (statusButton.text === 'OK') {
      navigate('/');
      return;
    }
    

    setStatusButton({ 
      ...statusButton,
      status: !statusButton,
      text: 'Enviando...'
    });

    const temporary_password = parseInt(Math.random() * 999999);

    const result = await passwordUpdate({
      document: documentDecrypt,
      password: temporary_password.toString()
    });

    if (result.status === 200) {

      const data = {
        action: action,
        email: email.noOmit,
        password: temporary_password,
        iv: dataParamsLink.iv,
        key: key,
        encryptedData: dataParamsLink.encryptedData,
        endpoint: AppPeople.settings.endpoint_change_password 
      }

      if (action === '0') {
        const result = await sendUserRegistrationConfirmation(data);
        if (result.status === 200) {
          setStatusButton({
            ...statusButton,
            status: !statusButton,
            text: 'OK'
          });
          setInformation(`E-mail enviado com sucesso. Para confirmar, verifique sua caixa de entrada ou spam e clique no botão Confirmar. Em: `);
          return;
        }
      }

      const sendEmailResult = await sendUserRecoverPassword(data);
      if (sendEmailResult.status === 200) {
        setStatusButton({
          ...statusButton,
          status: !statusButton,
          text: 'OK'
        });
        setInformation(`E-mail enviado com sucesso. Para confirmar, verifique sua caixa de entrada ou spam e clique no botão Confirmar. Em: `);
        return;
      }
      return;
    }
  }

  const cancel = (e) => {
    e.preventDefault();
    navigate('/');
    return;
  }

  useEffect(()=> {
    getContactsbyId();
    if (action === '0') {
      setTitle('Reenviar e-mail de cadastro');
      setStatusButton({ 
        ...statusButton,
        status: false,
        text: 'Redeenviar'
      });
    }
    else{ 
      setTitle('Redefinir');
      setStatusButton({ 
        ...statusButton,
        status: false,
        text: 'Redefinir'
      });
    };
  }, []);

  return(
    <div className="body">
    <div className="left-login">
      <img src={''} alt="img recuperacao de senha" className="chart" />
      <>Esqueci minha senha</>
    </div>
    <div className="right-login">
      <div className="card-login">
        <Form className="login-form" onSubmit={ sendEmail }>
          <h3>{title}</h3>
          <p className='caption'> { information } <b>{ email.omit }</b>.</p>
          <FormGroup>
          <Button 
              type='button' 
              className='button-cancelar'
              onClick={ cancel }
            >
              Cancelar                                           
            </Button>
            <Button 
              type='submit' 
              className='button-continuar'
              disabled={ statusButton.status }
            >
              { statusButton.status ? statusButton.text : statusButton.text }                                           
            </Button>  
          </FormGroup>  
        </Form>
      </div>
    </div>
  </div>
  );

}

export default RecoverPassword;