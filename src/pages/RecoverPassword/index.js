import React from "react";
import { useParams } from "react-router-dom";
import { Form, Button, FormGroup } from "reactstrap";
import './styles.css';
import { decrypt } from "../../utilities/Cryptography";
import { omitEmail } from '../../utilities/Masks';

const RecoverPassword = () => {

  const { document, iv, key } = useParams();
   
  const dataParamsLink = {
    iv: iv,
    key: new Uint8Array(Buffer.from(key,'hex')),
    encryptedData: document
  }

  const documentDecrypt = decrypt(dataParamsLink);   
  const email = omitEmail("neto.marcal.ce@gmail.com");

  return(
    <div className="body">
    <div className="left-login">
      <img src={''} alt="img recuperacao de senha" className="chart" />
      <>Esqueci minha senha</>
    </div>
    <div className="right-login">
      <div className="card-login">
        <Form className="login-form" onSubmit={ ()=>{} }>
          <h3>Recuperação de senha</h3>
          <p className='caption'>Para proteger sua conta, será enviado um e-mail de confirmação para <b>{ email }</b></p>
          <FormGroup>
            
          </FormGroup>                
          <Button 
            type='submit' 
            className='button-continuar'
          >
            Recuperar                                             
          </Button>  
        </Form>
      </div>
    </div>
  </div>
  );

}

export default RecoverPassword;