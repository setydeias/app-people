import React from "react";
import './styles.css';
import { setMaskTelefone } from "../../../utilities/Masks";

const Contacts = (props) => {

  return(
    <div className="row">
      <div className="col-6 col-sm-3">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">Contato</th>
              <th scope="col">Tipo</th>
              <th scope="col"></th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <tbody>
            {
              props.contacts.map((contact) => 
                <tr>
                  <td>{ contact.id_contact_type == 1 ? setMaskTelefone(contact.contact) : contact.contact }</td>
                  <td>
                    { 
                      contact.contact_type === 1
                    }
                  </td>
                  <td><i className="fas fa-edit"></i></td>
                  <td><i className="fas fa-trash"></i></td>
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