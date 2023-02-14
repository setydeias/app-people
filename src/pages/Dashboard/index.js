import React, { useState } from "react";
import { PersonContextProvider } from '../../Contexts/Person/PersonContext';
import PersonAddress from "../../components/People/PersonAddress";
import UserSettings from "../../globals/PeopleSettings";
import PersonData from "../../components/People/PersonData";


const Dashboard = (props) => {

  const personDefault = {
    id: '',        
    document_type: 1,
    document: '',
    description: '',
    usual_name: '',
    date: null,
    sexo: '1',
    treatment: null,
    date_registration: '',
    date_update: null,
    address_type: '',
    address: '',
    address_number: '',
    city: '',
    uf: '',
    address_complement: '',
    district: '',
    cep: '',
    contacts: []
}

const testDcumentExists =  async () => { 
  try {

    /*let resp = await getCustomerForDocument(person.document);
      
      if (resp.status === 200) {      
        
        setclientForDocumentExists(...resp.data.clients)
        setModalAlert({ 
          modal: true, 
          title: 'Atenção!', 
          text: 'Ducumento já cadastro. Deseja visualizar?', 
        })
      }*/

  } catch (error) {

    /*if(!error.response.data.message === 'Documento informado não cadastrado.') {
      setModal({
        ...modal,
        modal: true,
        titulo: 'Atenção!',
        texto: error.response.data.message,
        acao1: 'OK',
      })
    }*/
  }
}

const [person, setPerson] = useState(personDefault);

  return(
    <PersonContextProvider>
      <div className='container-sm'>
        <h4 className='title-page'>Cadastro único</h4>
        <p>Olá, { UserSettings.default.name }</p>
        <nav>
          <div className="nav nav-tabs d-flex justify-content-start" id="nav-tab" role="tablist">
            <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fas fa-user"></i> Dados Pessoal</button>
            <button className="nav-link" id="nav-api-tab-1" data-bs-toggle="tab" data-bs-target="#nav-api-1" type="button" role="tab" aria-controls="nav-api-1" aria-selected="false"><i class="fas fa-map-marker"></i> Endereço</button>
            <button className="nav-link" id="nav-api-tab-2" data-bs-toggle="tab" data-bs-target="#nav-api-2" type="button" role="tab" aria-controls="nav-api-2" aria-selected="false"><i class="fas fa-phone"></i> Contato</button>
            <button className="nav-link" id="nav-api-tab-3" data-bs-toggle="tab" data-bs-target="#nav-api-3" type="button" role="tab" aria-controls="nav-api-3" aria-selected="false"><i class="fas  fa-tasks"></i> Nível da conta</button>
          </div>
       </nav>
       <form className='row' onSubmit={ ()=>{} }> 
       <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
            <PersonData 
              person={ person }
              setPerson={ setPerson }
              testDcumentExists={ testDcumentExists }
              action={ props.action }
              document={ props.document}
            />
          </div>
          <div className="tab-pane fade" id="nav-api-1" role="tabpanel" aria-labelledby="nav-api-1" tabindex="0">
            <PersonAddress 
              person={ person }
              setPerson={ setPerson }
            />
          </div>
          <div className="tab-pane fade" id="nav-api-2" role="tabpanel" aria-labelledby="nav-api-2" tabindex="0">
            <>Contato</>
          </div>
          <div className="tab-pane fade" id="nav-api-3" role="tabpanel" aria-labelledby="nav-api-3" tabindex="0">
            <>Nível da conta</>
          </div>
        </div>
       </form>
      </div>
    </PersonContextProvider>
  );

}

export default Dashboard;