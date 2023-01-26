import axios from "axios";
import ApiPeople from "../globals/Endpoint/api_people";

export const login = async (user) => {
    const response = await axios.post(`${ApiPeople.settings.endpoint}/usuario/login`, user);
    return response;
}

export const getUserForDescription = async (user) => {
    const response = await axios.post(`${ApiPeople.settings.endpoint}/usuario/consultar/descricao`, user);
    return response;
}

export const registerUser = async (pessoa) => {
    const response = await axios.post(`${ApiPeople.settings.endpoint}/pessoa/cadastrar`, pessoa);
    return response;
}