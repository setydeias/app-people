import React from "react";

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
                  <td>{ contact.contact }</td>
                  <td>{ contact.contact_type }</td>
                  <td>Edit</td>
                  <td>Exc</td>
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