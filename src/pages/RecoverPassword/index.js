import React from "react";
import { useParams} from "react-router-dom";

const RecoverPassword = () => {

    const { cpf } = useParams();

    return(
        <>
            CPF: { cpf }
        </>
    );
}

export default RecoverPassword;