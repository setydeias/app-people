import React, { useState } from "react";
import './styles.css';
import { setMaskTelefone } from "../../../utilities/Masks";
import ModalConfirm from "../../Modal/Confirme";


const Contacts = (props) => {

  const modalConfirmDataDefalt = { title: '', text: '', emphasis: ''};
  const [modalConfirmData, setModalConfirmData] = useState(modalConfirmDataDefalt);

  return(
    <div className="row">
      <div className="col-6 col-sm-3">
        <button type="button" class="btn btn-outline-dark btn-sm" style={{"marginTop": "1em", "marginBottom": "0.5em"}}>ADICIONAR <i class="fa fa-plus-circle"></i></button>
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
              props.contacts.map((contact) => 
                <tr>
                  <td className="icon-type">{contact.main === 1 ? <i class="fas fa-check"  data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title="Principal"></i> : '' }</td>
                  <td>{ contact.id_contact_type == 1 ? setMaskTelefone(contact.contact) : contact.contact }{ contact.whatsapp === 1 ? <i class="fab fa-whatsapp" style={{"color":"green", "marginLeft": "0.3em"}} data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title="WhatsApp"></i> : '' }</td>
                  <td className="icon-type">
                    { 
                      contact.id_contact_type === 1 ? <i class="fas fa-phone" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title={ contact.contact_type }></i> : 
                      contact.id_contact_type === 2 ? <i class="fas fa-envelope" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title={ contact.contact_type }></i> : 
                      contact.id_contact_type === 3 ? <i class="fab fa-facebook-square" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title={ contact.contact_type }></i> :
                      contact.id_contact_type === 4 ? <i class="fab fa-instagram" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title={ contact.contact_type }></i> : 
                      contact.id_contact_type === 5 ? <i class="fas fa-globe" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title={ contact.contact_type }></i> : ''
                    }
                  </td>
                  <td data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title="Editar"><button type="button" class="btn btn-outline-dark btn-sm"><i className="fas fa-edit"></i></button></td>
                  <td data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title="Excluir">
                    <button 
                      type="button" 
                      class="btn btn-outline-danger btn-sm" 
                      data-bs-toggle="modal" 
                      data-bs-target="#exampleModal" 
                      onClick={(e) => { 
                          e.preventDefault()
                          setModalConfirmData({ ...modalConfirmData, title: 'Ateção!', text: 'Deseja excluir o contato: ', emphasis: contact.id_contact_type == 1 ? setMaskTelefone(contact.contact) : contact.contact }); 
                        }}><i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <ModalConfirm 
        modalConfirmData={ modalConfirmData }
        action={ props.delete }
      />
    </div>    
  )
}

export default Contacts;