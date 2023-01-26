import axios from "axios";
import ApiEmail from "../../globals/Endpoint/api_email";

export const sendUserRegistrationConfirmation = async (data) => {
  const response = await axios.get(
    `${ApiEmail.settings.endpoint}/cadastro/confirmacao/send`, data
  );
  return response;
}