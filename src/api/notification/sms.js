import axios from "axios";  

export const sendSMS = async (data) => {  
    const response = await axios.post('http://localhost:3177/api/sms/pessoa/cadastro/confirmacao/codigo', data);
	return response;
}
