import axios from "axios";
import Config from '../globals/PeopleSettings';

export const login = async (user) => {
    const response = await axios.post(`${Config.default.api_endpoint}usuario/login`, user);
    return response;
}

export const getUserForDescription = async (user) => {
    const response = await axios.post(`${Config.default.api_endpoint}usuario/consultar/descricao`, user);
    return response;
}

export const registerUser = async (pessoa) => {
    const response = await axios.post(`${Config.default.api_endpoint}pessoa/cadastrar`, pessoa);
    return response;
}