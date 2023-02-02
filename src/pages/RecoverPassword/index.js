import React from "react";
import { useParams } from "react-router-dom";
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
      <>
         CPF: { documentDecrypt }
      </>
  );

}

export default RecoverPassword;