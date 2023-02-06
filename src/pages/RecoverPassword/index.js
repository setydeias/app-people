import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, FormGroup } from "reactstrap";
import './styles.css';
import { decrypt } from "../../utilities/Cryptography";
import { omitEmail } from '../../utilities/Masks';
import { passwordUpdate } from '../../api/User';
import { getContactsbyIdPeople } from "../../api/People";
import { sendUserRecoverPassword } from "../../api/notification/email";
import AppPeople from "../../globals/Endpoint/app_people";

const RecoverPassword = () => {

  const { id_people, document, iv, key } = useParams();
   
  const dataParamsLink = {
    iv: iv,
    key: new Uint8Array(Buffer.from(key,'hex')),
    encryptedData: document
  }

  
  const statusButtonDefault = {
    text: 'Recuperar',
    status: false
  }
  
  const emailDefault = {
    omit: '',
    noOmit: ''
  }

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
      setStatusButton({
        ...statusButton,
        status: statusButton,
        text: 'Enviado'
      });

      const sendEmail = await sendUserRecoverPassword({
        email: email.noOmit,
        password: temporary_password,
        iv: dataParamsLink.iv,
        key: dataParamsLink.key,
        encryptedData: dataParamsLink.encryptedData,
        endpoint: AppPeople.settings.endpoint_change_password
      });

      if (sendEmail.status === 200) {
        setInformation(`Enviado com sucesso. Para confirmar, verifique sua caixa de entrada ou span e clique no botão Confirmar. No e-mail `);
        return;
      }

      return;
    }

    alert(JSON.stringify(result));

  }

  useEffect(()=> {
    getContactsbyId();    
  }, [])

  return(
    <div className="body">
    <div className="left-login">
      <img src={''} alt="img recuperacao de senha" className="chart" />
      <>Esqueci minha senha</>
    </div>
    <div className="right-login">
      <div className="card-login">
        <Form className="login-form" onSubmit={ sendEmail }>
          <h3>Recuperar o acesso</h3>
          <p className='caption'> { information } <b>{ email.omit }</b>.</p>
          <FormGroup>
            
          </FormGroup>                
          <Button 
            type='submit' 
            className='button-continuar'
            disabled={ statusButton.status }
          >
            { statusButton.status ? statusButton.text : statusButton.text }                                           
          </Button>  
        </Form>
      </div>
    </div>
  </div>
  );

}

export default RecoverPassword;