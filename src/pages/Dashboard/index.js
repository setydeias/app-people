import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PersonContextProvider } from '../../Contexts/Person/PersonContext';
import PersonAddress from "../../components/People/PersonAddress";
import PersonData from "../../components/People/PersonData";
import { addContact, deleteContact, getPersonById } from "../../api/People";
import PersonContacts from '../../components/People/PersonContacts';
import { Tooltip, Toast } from 'bootstrap';
import ModalConfirm from '../../components/Modal/Confirme';
import InfoToast from "../../components/InfoToast";

const Dashboard = (props) => {
  
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
  const { id_people, id_user } = useParams();
  
  const modalConfirmDataDefalt = { 
    title: '', 
    text: '', 
    emphasis: '',
    textAction1: '',
    textAction2: ''    
  };
  
  const infoToastDataDefault = {
    icon: '',
    icon_color: '',
    title: '',
    text: ''
  }  

  const personDefault = {  
    address_type: '',
    description: '',    
    id_people: '',
    id_status: '',
    id_document_type: '',
    document: '',
    name: '',
    usual_name: '',
    birth_date: '',
    sexo: '',
    id_treatment: '',
    date_registration: '',
    last_change: '',
    id_adress: '',
    id_address_type: '',
    address: '',
    address_number: '',
    city: '',
    uf: '',
    address_complement: '',
    district: '',
    cep: '',
    document_type: 1,
    contacts: []
  }
  
  const contactSelectedDefault = {
    index: '',
    id_contact: '',
    id_people: '',
    id_contact_type: '',
    contact: '',
    whatsapp: '',
    main: '',
    contact_type: ''
  }
  
  const contactDefault = {
    id_people: id_people,
    id_contact: '',
    id_contact_type: '',
    contact: '',
    whatsapp: '',
    main: ''
  }

  const [modalConfirmData, setModalConfirmData] = useState(modalConfirmDataDefalt);
  const toastLiveExample = document.getElementById('liveToast');
  const [infoToastData, setInfoToastData] = useState(infoToastDataDefault);
  const [contact, setContact] = useState(contactDefault);  
  const [contactSelected, setContactSelected] = useState(contactSelectedDefault);
  const [person, setPerson] = useState(personDefault);

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

  const getPersonForId = async () => {

    try {
      const result = await getPersonById(id_people);
      if(result.status === 200) {
        setPerson({
          ...person,
          description: result.data.person.name,
          id_people: result.data.person.id_people,
          id_status: result.data.person.id_status,
          id_document_type: result.data.person.id_document_type,
          document: result.data.person.document,
          name: result.data.person.name,
          usual_name: result.data.person.usual_name,
          birth_date: result.data.person.birth_date.substring(0, 10),
          sexo: result.data.person.sexo,
          id_treatment: result.data.person.id_treatment,
          date_registration: result.data.person.date_registration,
          last_change: result.data.person.last_change,
          id_address: result.data.person.id_address,
          id_address_type: result.data.person.id_adress_type,
          address_type: result.data.person.address_type,
          address: result.data.person.adress,
          address_number: result.data.person.address_number,
          city: result.data.person.city,
          uf: result.data.person.uf,
          address_complement: result.data.person.address_complement,
          district: result.data.person.district,
          cep: result.data.person.cep,
          document_type: result.data.person.document_type,
          contacts: result.data.contacts,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const contactAdd = async (e) => {
    
    e.preventDefault();
    const toast = new Toast(toastLiveExample);
    setInfoToastData(infoToastDataDefault);

    try {

      const response = await addContact(contact);
      if (response.status === 200) {

        setInfoToastData({
          icon: 'fa fa-info-circle',
          icon_color: 'green',
          title: 'Informação',
          text: response.data.message
        });     
        toast.show(); 
      }
    } catch (error) {
      setInfoToastData({
        icon: 'fa fa-exclamation-triangle',
        icon_color: 'orange',
        title: 'Atenção',
        text: 'Não foi possível adicionar o contato.'
      });     
      toast.show();
    }
  }

  const removeContact = async (e) => {

    e.preventDefault();
    const toast = new Toast(toastLiveExample);
    setInfoToastData(infoToastDataDefault);   
    
    try {

      const response = await deleteContact(contactSelected.id_contact);
      if (response.status === 200) {
        
        if (contactSelected.index > -1) {
          person.contacts.splice(contactSelected.index, 1);
        }        
        setPerson({ ...person, contacts: person.contacts });
        setInfoToastData({
          icon: 'fa fa-info-circle',
          icon_color: 'green',
          title: 'Informação',
          text: response.data.message
        });     
        toast.show(); 
      }
    } catch (error) {
      setInfoToastData({
        icon: 'fa fa-exclamation-triangle',
        icon_color: 'orange',
        title: 'Atenção',
        text: 'Não foi possível remover o contato.'
      });     
      toast.show();
    }
  }

  useEffect(()=>{
    getPersonForId();
  },[]);


  return(
    <PersonContextProvider>
      <div className='container-sm'>
        <h4 className='title-page'>Cadastro único</h4>
        <p>Olá, <b className='title-page'>{ person.name.toUpperCase() }</b></p>
        <nav>
          <div className="nav nav-tabs d-flex justify-content-start" id="nav-tab" role="tablist">
            <button 
              className="nav-link active" 
              id="nav-home-tab" 
              data-bs-toggle="tab" 
              data-bs-target="#nav-home" 
              type="button" 
              role="tab" 
              aria-controls="nav-home" 
              aria-selected="true"
            >
              <i class="fas fa-user"></i> Dados Pessoal
            </button>
            <button 
              className="nav-link" 
              id="nav-api-tab-1" 
              data-bs-toggle="tab" 
              data-bs-target="#nav-api-1" 
              type="button" 
              role="tab" 
              aria-controls="nav-api-1" 
              aria-selected="false"
            >
              <i class="fas fa-map-marker"></i> Endereço
            </button>
            <button 
              className="nav-link"
              id="nav-api-tab-2" 
              data-bs-toggle="tab" 
              data-bs-target="#nav-api-2" 
              type="button" 
              role="tab" 
              aria-controls="nav-api-2" 
              aria-selected="false">
                <i class="fas fa-phone"></i> Contato
            </button>
            <button 
              className="nav-link" 
              id="nav-api-tab-3" 
              data-bs-toggle="tab" 
              data-bs-target="#nav-api-3" 
              type="button" 
              role="tab" 
              aria-controls="nav-api-3" 
              aria-selected="false" 
            >
              <i class="fas  fa-tasks"></i> Nível da conta
            </button>
          </div>
       </nav>
       <form className='row' onSubmit={ ()=>{} }> 
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
            <PersonData 
              person={ person }
              setPerson={ setPerson }
              testDcumentExists={ testDcumentExists }
            />
          </div>
          <div className="tab-pane fade" id="nav-api-1" role="tabpanel" aria-labelledby="nav-api-1" tabindex="0">
            <PersonAddress 
              person={ person }
              setPerson={ setPerson }
            />
          </div>
          <div className="tab-pane fade" id="nav-api-2" role="tabpanel" aria-labelledby="nav-api-2" tabindex="0">
            <PersonContacts 
              contacts={ person.contacts }
              person={ person }
              setPerson={ setPerson }
              contact={ contact }
              setContact={setContact }
              contactSelected={ contactSelected }
              setContactSelected={ setContactSelected }
              modalConfirmDataDefalt={ modalConfirmDataDefalt }
              modalConfirmData={ modalConfirmData }
              setModalConfirmData={ setModalConfirmData }
            />
          </div>
          <div className="tab-pane fade" id="nav-api-3" role="tabpanel" aria-labelledby="nav-api-3" tabindex="0">
            <>Nível da conta</>
          </div>
        </div>
       </form>
       <ModalConfirm
        id="modalConfirmeDelete" 
        modalConfirmData={ modalConfirmData }        
        action={ removeContact }
      />      
      <InfoToast data={ infoToastData } />
    </div>
    </PersonContextProvider>
  );

}

export default Dashboard;