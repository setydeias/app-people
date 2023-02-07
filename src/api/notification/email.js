import axios from "axios";
import ApiEmail from "../../globals/Endpoint/api_email";

export const sendUserRegistrationConfirmation = async (data) => {
  const response = await axios.post(
    `${ApiEmail.settings.endpoint}/pessoa/cadastro/confirmacao/send`, data);
  return response;
}

export const sendUserRecoverPassword = async (data) => {
  const response = await axios.post(`
    ${ApiEmail.settings.endpoint}/pessoa/usuario/senha/redefinir`, data);
  return response;
}