import axios from "axios";
import ApiPeople from "../globals/Endpoint/api_people";

export const getContactsbyIdPeople = async (id_people) => {
    const response = await axios.get(`${ApiPeople.settings.endpoint}/pessoa/consultar/contatos/${id_people}`);
    return response;
}