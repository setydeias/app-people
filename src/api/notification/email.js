import axios from "axios";
import PeopleSettings from '../../globals/PeopleSettings';

export const sendUserRegistrationConfirmation = async (data) => {
  const response = await axios.get(
    `${PeopleSettings.default.api_email_endpoint}/cadastro/confirmacao/send`, data
  );
  return response;
}