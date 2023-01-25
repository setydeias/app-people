import React from "react";
import { useParams } from 'react-router-dom';
import { encrypt, decrypt } from '../../utilities/Cryptography';

const ChangePassword = () => {

  const { user, password, iv, key } = useParams();
  
  const data = {
    iv: iv,
    key: new Uint8Array(Buffer.from(key,'hex')),
    encryptedData: user
  }
  
  const cpf = decrypt(data);

  return(
    <div>
      <h3>CPF: { cpf } </h3>
      <h3>Senha: {  } </h3>
    </div>
  );
}

export default ChangePassword;