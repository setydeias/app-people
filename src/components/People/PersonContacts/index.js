import React, { useState } from "react";
import './styles.css';
import { setMaskTelefone } from "../../../utilities/Masks";


const PersonContacts = (props) => {
   
  
  const btnEdit = (e, data, index) => {
    e.preventDefault();
    props.setActionType('edit');

    props.setModalConfirmData({ 
      ...props.modalConfirmData, 
      title: 'Editar contato', 
      text: '',                            
      emphasis: '',
      textAction1: 'Cancelar',
      textAction2: 'Confirmar', 
    });

    props.setContactSelected({
      ...props.contactSelected, 
      ...data, 
      index: index-1
    })

    props.setContactPerson({
      ...props.contactPerson,
      ...data,
      index: index-1
    });
  };

  const btnDelete = (e, data, index) => {
    e.preventDefault();
    props.setActionType('delete');
    
    props.setModalConfirmData({ 
      ...props.modalConfirmData, 
      title: 'Ateção!', 
      text: 'Deseja excluir o contato: ',                            
      emphasis: data.id_contact_type == 1 ? 
        setMaskTelefone(data.contact) : data.contact,
      textAction1: 'Não',
      textAction2: 'Sim', 
    });

    props.setContactSelected({
      ...props.contactSelected, 
      ...data, 
      index: index-1
    })                        
  }

  return(
    <div className="row">
      <div className="col-6 col-sm-3">
        <button 
          type="button" 
          className="btn btn-outline-dark btn-sm" 
          data-bs-toggle="modal" 
          data-bs-target="#modalConfirmeContactAdd" 
          style={{"marginTop": "1em", "marginBottom": "0.5em"}}
          onClick={ props.btnAdd }
        >
          ADICIONAR <i className="fa fa-plus-circle"></i>
        </button>
        <table className="table align-middle table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Contato</th>
              <th scope="col">Tipo</th>
              <th scope="col" colSpan="2">Ação</th>
            </tr>
          </thead>
          <tbody>
            {
              props.contacts.map((contact, index) => 
                <tr key={index++}>
                  <td className="icon-type">{contact.main === 1 ? <i className="fas fa-check"  data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title="Principal"></i> : '' }</td>
                  <td>{ contact.id_contact_type == 1 ? setMaskTelefone(contact.contact) : contact.contact }{ contact.whatsapp === 1 ? <i className="fab fa-whatsapp" style={{"color":"green", "marginLeft": "0.3em"}} data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title="WhatsApp"></i> : '' }</td>
                  <td className="icon-type">
                    { 
                      contact.id_contact_type === 1 ? <i className="fas fa-phone" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title={ contact.contact_type }></i> : 
                      contact.id_contact_type === 2 ? <i className="fas fa-envelope" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title={ contact.contact_type }></i> : 
                      contact.id_contact_type === 3 ? <i className="fab fa-facebook-square" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title={ contact.contact_type }></i> :
                      contact.id_contact_type === 4 ? <i className="fab fa-instagram" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title={ contact.contact_type }></i> : 
                      contact.id_contact_type === 5 ? <i className="fas fa-globe" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title={ contact.contact_type }></i> : ''
                    }
                  </td>
                  <td>
                    <button 
                      type="button" 
                      className="btn btn-outline-dark btn-sm"
                      data-bs-toggle="modal" 
                      data-bs-target="#modalContactEdit"
                      onClick={(e) => btnEdit(e, contact, index) }><i className="fas fa-edit"></i>
                    </button>
                  </td>
                  <td>
                    <button 
                      type="button" 
                      className="btn btn-outline-danger btn-sm" 
                      data-bs-toggle="modal" 
                      data-bs-target="#modalConfirmeDelete" 
                      onClick={(e) => btnDelete(e, contact, index) }><i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>      
    </div>    
  )
}

export default PersonContacts;