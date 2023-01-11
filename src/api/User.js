import axios from "axios";
import Config from '../globals/PeopleSettings';

export const login = async (user) => {
    const response = await axios.post(`${Config.default.api_endpoint}usuario/login`, user);
    return response;
}