import axios from "axios";
import Config from '../globals/PeopleSettings';

export const Login = async (user) => {
    const response = await axios.post(`${Config.config.api_endpoint}usuario/login`, user);
    return response;
}