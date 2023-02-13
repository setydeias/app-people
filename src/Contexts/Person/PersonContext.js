import React, { useState, createContext } from "react";

export const PersonContext = createContext()

export const PersonContextProvider = (props) => {
    
    const dataDefault = {
        erro: 'Campo obrigatório!',
        validate: 'form-control'
    } 
    
    const statusFormDefault =  {      
        document_type: dataDefault,
        document: dataDefault,
        description: dataDefault,
        date: dataDefault,  
        sexo: dataDefault,
        treatment: dataDefault,
        usual_name: dataDefault,
        address_type: dataDefault,
        address: dataDefault,
        address_number: dataDefault, 
        city: dataDefault,
        uf: dataDefault,
        address_complement: dataDefault,   
        district: dataDefault,
        cep: dataDefault,
        address_caracters: dataDefault
    }
    
    const [formStatus, setFormStatus] = useState(()=>statusFormDefault);

    return(
        <PersonContext.Provider value={{ 
                formStatus, 
                setFormStatus,
                statusFormDefault 
            }}
        > 
            { props.children }
        </PersonContext.Provider>
    );
}; 