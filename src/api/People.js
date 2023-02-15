import axios from "axios";
import ApiPeople from "../globals/Endpoint/api_people";


export const getPersonById = async (id_people) => {
    const response = await axios.post(`${ApiPeople.settings.endpoint}/pessoa/consultar`, { id_people: id_people });
    return response;
}

export const getContactsbyIdPeople = async (id_people) => {
    const response = await axios.get(`${ApiPeople.settings.endpoint}/pessoa/consultar/contatos/${id_people}`);
    return response;
}

export const emailRegistrationStatus = async (email) => {
    const response = await axios.post(`${ApiPeople.settings.endpoint}/pessoa/consultar/contatos/email`, email);
    return response;
}

export const getTreatment = async () => {
    const response = await axios.get(`${ApiPeople.settings.endpoint}/tratamento/consultar/todos`);
    return response;
}