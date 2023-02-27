import React from "react";
import './styles.css';
import { setMaskTelefone } from "../../../utilities/Masks";

const Contacts = (props) => {

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
                  <td className="icon-type">{contact.main === 1 ? <i class="fas fa-check"></i> : '' }</td>
                  <td>{ contact.id_contact_type == 1 ? setMaskTelefone(contact.contact) : contact.contact }{ contact.whatsapp === 1 ? <i class="fab fa-whatsapp" style={{"color":"green", "marginLeft": "0.3em"}}></i> : '' }</td>
                  <td className="icon-type">
                    { 
                      contact.id_contact_type === 1 ? <i class="fas fa-phone"></i> : 
                      contact.id_contact_type === 2 ? <i class="fas fa-envelope"></i> : 
                      contact.id_contact_type === 3 ? <i class="fab fa-facebook-square"></i> :
                      contact.id_contact_type === 4 ? <i class="fab fa-instagram"></i> : 
                      contact.id_contact_type === 5 ? <i class="fas fa-globe"></i> : ''
                    }
                  </td>
                  <td><button type="button" class="btn btn-outline-dark btn-sm"><i className="fas fa-edit"></i></button></td>
                  <td><button type="button" class="btn btn-outline-danger btn-sm"><i className="fas fa-trash"></i></button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>    
  )
}

export default Contacts;