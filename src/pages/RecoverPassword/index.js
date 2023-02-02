import React from "react";
import { useParams } from "react-router-dom";
import { Form, Button, FormGroup } from "reactstrap";
import './styles.css';
import { decrypt } from "../../utilities/Cryptography";


const RecoverPassword = () => {

  const { document, iv, key } = useParams();
   
  const dataParamsLink = {
    iv: iv,
    key: new Uint8Array(Buffer.from(key,'hex')),
    encryptedData: document
  }

  const documentDecrypt = decrypt(dataParamsLink);

  return(
    <div className="body">
    <div className="left-login">
      <img src={''} alt="Pessoas olhando gráficos" className="chart" />
      <>Recuparar senha</>
    </div>
    <div className="right-login">
      <div className="card-login">
        <Form className="login-form" onSubmit={ ()=>{} }>
          <h3>Esqueci minha senha</h3>
          <p className='caption'>Text aqui</p>
          <FormGroup>
            <div className="input-group has-validation">
              <span className="input-group-text"><i className="fas fa-envelope caption"></i></span>
              <div className="form-floating is-invalid">
                <input 
                  type="email"
                  className="form-control"
                  id="email" 
                  name='email' 
                  autoFocus={true}
                  placeholder="user_password_new" 
                  required 
                />
                <label for="email_label">E-mail</label>
              </div>
              <div className="invalid-feedback">
               
              </div>
            </div>  
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