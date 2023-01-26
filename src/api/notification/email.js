import axios from "axios";

export const sendUserRegistrationConfirmation = async (data) => {
    const response = await axios.get('http://localhost:3177/api/email/pessoa/cadastro/confirmacao/send', data);
    return response;
}