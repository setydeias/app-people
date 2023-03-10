import React, { useContext, useEffect, useState } from "react";
import { PersonContext } from "../../Contexts/Person/PersonContext";
import { useParams } from "react-router-dom";
import PersonAddress from "../../components/People/PersonAddress";
import PersonData from "../../components/People/PersonData";
import { 
  addContact, 
  deleteContact, 
  getPersonById, 
  getContactsType, 
  patchContact 
} from "../../api/People";
import PersonContacts from '../../components/People/PersonContacts';
import { Tooltip, Toast } from 'bootstrap';
import ModalConfirm from '../../components/Modal/Confirme';
import InfoToast from "../../components/InfoToast";
import PersonContactAction from "../../components/People/PersonContactAction";
import { noMask, setMaskTelefone } from "../../utilities/Masks";
import { isValidEMail, testValidPhone, isSite } from "../../utilities/Utilities";


const Dashboard = (props) => {  

  const { formStatus, setFormStatus } = useContext(PersonContext);

  var references = {
    contactRef: document.getElementById('floatingTexContact'),    
  }
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
  const { id_people, id_user } = useParams();
  
  const [once, setOnce] = useState(0);

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
    contacts: [{}]
  }

  const contactPersonDefaut = {
    id_people: id_people,
    id_contact: '',
    id_contact_type: 1,
    contact: '',
    whatsapp: 0,
    main: 0,
    contact_type: ''
  }
  
  const [actionType, setActionType] = useState('add');
  const [modalConfirmData, setModalConfirmData] = useState(modalConfirmDataDefalt);
  const toastLiveExample = document.getElementById('liveToast');
  const [infoToastData, setInfoToastData] = useState(infoToastDataDefault);
  const [contactTypeList, setContactTypeList] = useState([]);
  const [person, setPerson] = useState(personDefault);
  const [contactPerson, setContactPerson] = useState(contactPersonDefaut); 
  const [index, setIndex] = useState(-1);
  const [contactTypeLabelSelected, setContactTypeLabelSelected] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setContactPerson({ ...contactPerson, [name]: noMask(value) });
    setFormStatusDefault();
  }; 

  const handleChangeContactType = (e) => {
    const { name, value } = e.target;
    setContactPerson({ 
      ...contactPerson, [name]: value,
      contact: '',
    });
    updateContactTypeDescription(value);
    setFormStatusDefault();
  }; 
  
  const handleChangeContactMain = (e) => {
    const { name, checked,  } = e.target;
    setContactPerson({ ...contactPerson, [name]: Number(checked) });
    setFormStatusDefault();
  }; 

  const handleChangeContactWhatsApp = (e) => {
    const { name, checked } = e.target;
    setContactPerson({ ...contactPerson, [name]: Number(checked) });
    setFormStatusDefault();
  }; 

  const testDcumentExists =  async () => { 
    try {
      
      /*let resp = await getCustomerForDocument(person.document);
      
      if (resp.status === 200) {      
        
        setclientForDocumentExists(...resp.data.clients)
        setModalAlert({ 
          modal: true, 
          title: 'Aten????o!', 
          text: 'Ducumento j?? cadastro. Deseja visualizar?', 
        })
      }*/

    } catch (error) {

      /*if(!error.response.data.message === 'Documento informado n??o cadastrado.') {
        setModal({
          ...modal,
          modal: true,
          titulo: 'Aten????o!',
          texto: error.response.data.message,
          acao1: 'OK',
        })
      }*/
    }
  }

  const btnAdd = (e) => {
    
    e.preventDefault();
    setActionType('add');
    setContactPerson(contactPersonDefaut);
    setFormStatusDefault();
    setContactTypeLabelSelected(contactPerson.id_contact_type)
    setModalConfirmData({ 
      ...modalConfirmData, 
      title: 'Adicionar Contato', 
      text: '',                            
      emphasis: '',
      textAction1: 'Cancelar',
      textAction2: 'Confirmar', 
    });    
  }

  const getPersonForId = async () => {

    try {

      const result = await getPersonById(id_people);

      if(result.status === 200) {
        setPerson({
          ...person,
          description: result.data.person.name != null ? result.data.person.name : '',
          id_people: result.data.person.id_people,
          id_status: result.data.person.id_status,
          id_document_type: result.data.person.id_document_type,
          document: result.data.person.document != null ? result.data.person.document : '',
          name: result.data.person.name != null ? result.data.person.name : '',
          usual_name: result.data.person.usual_name != null ? result.data.person.usual_name : '',
          birth_date: result.data.person.birth_date =! null ? result.data.person.birth_date : '',
          sexo: result.data.person.sexo,
          id_treatment: result.data.person.id_treatment,
          date_registration: result.data.person.date_registration != null ? result.data.person.date_registration : '',
          last_change: result.data.person.last_change != null ? result.data.person.last_change : '',
          id_address: result.data.person.id_address,
          id_address_type: result.data.person.id_adress_type != null ?  result.data.person.id_adress_type : '',
          address_type: result.data.person.address_type != null ? result.data.person.address_type : '',
          address:  result.data.person.adress != null ? result.data.person.adress : '',
          address_number: result.data.person.address_number != null ? result.data.person.address_number : '',
          city: result.data.person.city != null ? result.data.person.city : '',
          uf: result.data.person.uf != null ? result.data.person.uf : '',
          address_complement: result.data.person.address_complement != null ? result.data.person.address_complement : '',
          district: result.data.person.district != null ? result.data.person.district : '',
          cep: result.data.person.cep != null ? result.data.person.cep : '',
          document_type: result.data.person.document_type != null ? result.data.person.document_type : '',
          contacts: result.data.contacts,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const setContactsType = async () => {
    
    setInfoToastData(infoToastDataDefault);
    const toastSetContactType = new Toast(toastLiveExample);

    try {

      const response = await getContactsType();
      if (response.status === 200) {
        setContactTypeList(response.data.list);        
      }
    } catch (error) {
      setInfoToastData({
        icon: 'fa fa-exclamation-triangle',
        icon_color: 'orange',
        title: 'Aten????o',
        text: 'N??o foi poss??vel adicionar o contato.'
      });     
      toastSetContactType.show();
    }
  }

  const contactAdd = async (e) => {

    e.preventDefault();
    setInfoToastData(infoToastDataDefault);
    const toastAdd = new Toast(toastLiveExample);
    
    try {

      if (testContactForType()) {
        const response = await addContact({ ...contactPerson, contact: noMask(contactPerson.contact) });
        if (response.status === 200) {
          setInfoToastData({
            icon: 'fa fa-info-circle',
            icon_color: 'green',
            title: 'Informa????o',
            text: response.data.message
          });   
          person.contacts.push({
            ...contactPerson,
            id_contact: response.data.id_contact_inserted,
            id_contact_type: contactPerson.id_contact_type,
            contact: noMask(contactPerson.contact),
            contact_type: contactTypeLabelSelected
          });
          toastAdd.show();
        }
      }

    } catch (error) {
      setInfoToastData({
        icon: 'fa fa-exclamation-triangle',
        icon_color: 'orange',
        title: 'Aten????o',
        text: 'N??o foi poss??vel adicionar o contato.'
      });     
      toastAdd.show();
    }
  }

  const updateContactTypeDescription = (data) => {
    contactTypeList.map((contactType) => {
      if (contactType.id_contact_type == data) {
        setContactTypeLabelSelected(contactType.description);
        return;
      }
    });
  }

  const contactEdit = async (e) => {

    e.preventDefault();
    setInfoToastData(infoToastDataDefault);
    const toastEdit = new Toast(toastLiveExample);

    try {

      if (testContactForType()) {
        const response = await patchContact(contactPerson);
        if (response.status === 200) {
  
          setInfoToastData({
            icon: 'fa fa-info-circle',
            icon_color: 'green',
            title: 'Informa????o',
            text: response.data.message
          });     
          setContactPerson(contactPersonDefaut);
          toastEdit.show();
        }
  
        for (let index = 0; index < person.contacts.length; index++) {
          if (person.contacts[index].id_contact === contactPerson.id_contact) {
          
            person.contacts[index] = {
              id_contact: contactPerson.id_contact,
              id_people: contactPerson.id_people,
              id_contact_type: contactPerson.id_contact_type,
              contact: noMask(contactPerson.contact),
              whatsapp: contactPerson.whatsapp,
              main: contactPerson.main,
              contact_type: contactPerson.contact_type
            };
          }
        }
      }
      
    } catch (error) {
      setInfoToastData({
        icon: 'fa fa-exclamation-triangle',
        icon_color: 'orange',
        title: 'Aten????o',
        text: 'N??o foi poss??vel Editar o contato.'
      });     
      toastEdit.show();
    }
  }

  const removeContact = async (e) => {

    e.preventDefault();
    setInfoToastData(infoToastDataDefault);   
    const toastDelete = new Toast(toastLiveExample);
    
    try {

      const response = await deleteContact(contactPerson.id_contact);
      if (response.status === 200) {
        
        if (index > -1) {
          person.contacts.splice(index, 1);
        }        
        setPerson({ ...person, contacts: person.contacts });
        setInfoToastData({
          icon: 'fa fa-info-circle',
          icon_color: 'green',
          title: 'Informa????o',
          text: response.data.message
        }); 
        toastDelete.show(); 
      }
    } catch (error) {
      setInfoToastData({
        icon: 'fa fa-exclamation-triangle',
        icon_color: 'orange',
        title: 'Aten????o',
        text: 'N??o foi poss??vel remover o contato.'
      });     
      toastDelete.show();
    }
  }

  const btnEdit = (e, data, index) => {
    e.preventDefault();
    setActionType('edit');
    console.log(`Index: ${index} Dados: ${JSON.stringify(data)}`)
    setFormStatusDefault();
    setModalConfirmData({ 
      ...modalConfirmData, 
      title: 'Editar contato', 
      text: '',                            
      emphasis: '',
      textAction1: 'Cancelar',
      textAction2: 'Confirmar', 
    });

    setContactPerson({ 
      ...contactPerson, 
      ...data, 
      contact: noMask(data.contact)
    });
    setIndex(index-1);
  };

  const btnDelete = (e, data, index) => {
    e.preventDefault();
    setActionType('delete');

    console.log(`Index: ${index} Dados: ${JSON.stringify(data)}`)
    
    setModalConfirmData({ 
      ...modalConfirmData, 
      title: 'Ate????o!', 
      text: 'Deseja excluir o contato: ',                            
      emphasis: data.id_contact_type == 1 ? 
        setMaskTelefone(data.contact) : data.contact,
      textAction1: 'N??o',
      textAction2: 'Sim', 
    });

    setContactPerson({ ...contactPerson, ...data });
    setIndex(index-1);                        
  }

  const resetContactPerson = (e) => {
    e.preventDefault();
    setContactPerson(contactPersonDefaut); 
  }

  const setFormStatusDefault = () => {
    setFormStatus({...formStatus, 
      contact: {
        erro: '',
        validate: 'form-control'
      }
    });
  }

  const testPhone = () => {
    if (contactPerson.contact) {
      if(!testValidPhone(noMask(contactPerson.contact))){
        setFormStatus({...formStatus, 
          contact: {
            erro: 'Telefone inv??lido!',
            validate: 'form-control is-invalid'
          }
        });
        return false; 
      }
      setFormStatusDefault();
      return true 
    }    
    setFormStatus({...formStatus, 
      contact: {
        erro: 'Telefone inv??lido.',
        validate: 'form-control is-invalid'
      }
    });
    return false;
  }

  const testEmail = () => {
    console.log(`testeEmail: ${ contactPerson.contact }`)
    if (contactPerson.contact) {
      if (isValidEMail(contactPerson.contact)) {
        setFormStatusDefault();
        return true;
      }
      setFormStatus({...formStatus, 
        contact: {
          erro: 'E-mail inv??lido!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      contact: {
        erro: 'E-mail inv??lido!',
        validate: 'form-control is-invalid'
      }
    });
    return false;
  }

  const testSite = () => {
    if (contactPerson.contact) {
      if (isSite(contactPerson.contact)) {
        setFormStatusDefault();
        return true;
      }
      setFormStatus({...formStatus, 
        contact: {
          erro: 'Site inv??lido!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      contact: {
        erro: 'P??gina  inv??lido!',
        validate: 'form-control is-invalid'
      }
    });
    return false;
  }

  const testContactPerson = () => {
    if (contactPerson.contact) {
      setFormStatusDefault();
      return true;
    }
    setFormStatus({...formStatus, 
      contact: {
        erro: 'Contato inv??lido!',
        validate: 'form-control is-invalid'
      }
    });
    return false;
  }


  const testContactForType = () => {
    switch (contactPerson.id_contact_type.toString()) {
      case '1':
        return testPhone();
      case '2':
       return testEmail();
      case '5':
        return testSite();
      default:
       return testContactPerson();
    }
  }

  useEffect(()=>{
    getPersonForId();
    setContactsType();
  },[once]);


  return(
    <div className='container-sm'>
      <h4 className='title-page'>Cadastro ??nico</h4>
      <p>Ol??, <b className='title-page'>{ person.name ? person.name.toUpperCase() : 'Seja bem vindo!' }</b></p>
      <div className="col-md-6" col style={{"color": "orangered"}}>
        <i class="fa fa-exclamation-triangle"></i> Para melhorar o n??vel da conta, informe seus dados.
      </div>
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
             <i className="fas fa-user"></i> Dados Pessoal
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
             <i className="fas fa-map-marker"></i> Endere??o
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
               <i className="fas fa-phone"></i> Contato
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
             <i className="fas  fa-tasks"></i> N??vel da conta
           </button>
         </div>
       </nav>
       <form className='row' onSubmit={ ()=>{} }> 
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
            <PersonData 
              person={ person }
              setPerson={ setPerson }
              testDcumentExists={ testDcumentExists }
            />
          </div>
          <div className="tab-pane fade" id="nav-api-1" role="tabpanel" aria-labelledby="nav-api-1" tabIndex="0">
            <PersonAddress 
              person={ person }
              setPerson={ setPerson }
            />
          </div>
          <div className="tab-pane fade" id="nav-api-2" role="tabpanel" aria-labelledby="nav-api-2"  tabIndex="0">
            <PersonContacts 
              setActionType={ setActionType }
              contacts={ person.contacts }
              person={ person }
              setPerson={ setPerson }
              contactTypeList={ contactTypeList }
              contactPerson={ contactPerson }
              setContactPerson={ setContactPerson }
              contactPersonDefaut={ contactPersonDefaut }
              modalConfirmDataDefalt={ modalConfirmDataDefalt }
              modalConfirmData={ modalConfirmData }
              setModalConfirmData={ setModalConfirmData }
              btnAdd={ btnAdd }
              btnEdit={ btnEdit }
              btnDelete={ btnDelete }
              setFormStatusDefault={ setFormStatusDefault }
            />
          </div>
          <div className="tab-pane fade" id="nav-api-3" role="tabpanel" aria-labelledby="nav-api-3"   tabIndex="0">
            <>N??vel da conta</>
          </div>
        </div>
       </form>
       <ModalConfirm
        id="modalConfirmeDelete" 
        modalConfirmData={ modalConfirmData } 
        action={ resetContactPerson }       
        action1={ removeContact }
      />
      <ModalConfirm
        id="modalConfirmeContactAdd"
        modalConfirmData={ modalConfirmData }    
        action={ resetContactPerson }   
        action1={ contactAdd }
      >
        <PersonContactAction 
          id="ContactActionAdd" 
          id_person={ person.id_person }
          actionType={ actionType }
          setActionType={ setActionType }
          contactTypeList= { contactTypeList }
          contactPerson={ contactPerson }
          handleChange={ handleChange }
          handleChangeContactType={ handleChangeContactType }
          handleChangeContactMain={ handleChangeContactMain }
          handleChangeContactWhatsApp={ handleChangeContactWhatsApp }
          setFormStatusDefault={ setFormStatusDefault }
        />
      </ModalConfirm>
      <ModalConfirm
        id="modalContactEdit"
        modalConfirmData={ modalConfirmData }       
        action={ resetContactPerson }
        action1={ contactEdit }
      >
        <PersonContactAction
          id="ContactActionEdit" 
          id_person={ person.id_person }
          actionType={ actionType }
          setActionType={ setActionType }
          contactPerson= { contactPerson }
          contactTypeList= { contactTypeList }
          handleChange={ handleChange }
          handleChangeContactType={ handleChangeContactType }
          handleChangeContactMain={ handleChangeContactMain }
          handleChangeContactWhatsApp={ handleChangeContactWhatsApp }
          setFormStatusDefault={ setFormStatusDefault }
        />
      </ModalConfirm>            
      <InfoToast data={ infoToastData } />
    </div>
  );

}

export default Dashboard;