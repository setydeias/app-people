import axios from "axios";
import ApiEmail from "../../globals/Endpoint/api_email";

export const sendUserRegistrationConfirmation = async (data) => {

  console.log(data);
  const response = await axios.post(
    `${ApiEmail.settings.endpoint}/cadastro/confirmacao/send`, data
  );
  return response;
}