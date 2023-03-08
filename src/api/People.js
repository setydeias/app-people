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

export const addContact = async (data) => {
    const response = await axios.post(`${ApiPeople.settings.endpoint}/pessoa/contato/adicionar`, data);
    return response;
}

export const patchContact = async (data) => {
    const response = await axios.patch(`${ApiPeople.settings.endpoint}/pessoa/contato/editar`, data);
    return response;
}

export const deleteContact = async (id_contatct) => {
    const response = await axios.delete(`${ApiPeople.settings.endpoint}/pessoa/contato/delete/${id_contatct}`);
    return response;
}

export const emailRegistrationStatus = async (email) => {
    const response = await axios.post(`${ApiPeople.settings.endpoint}/pessoa/consultar/contatos/email`, email);
    return response;
}

export const getTreatments = async () => {
    const response = await axios.get(`${ApiPeople.settings.endpoint}/tratamento/consultar/todos`);
    return response;
}

export const getAdressType = async () => {
    const response = await axios.get(`${ApiPeople.settings.endpoint}/endereco/tipo/consultar/todos`);
    return response;
}

export const getContactsType = async () => {
    const response = await axios.get(`${ApiPeople.settings.endpoint}/contato/tipo/consultar/todos`);
    return response;
}