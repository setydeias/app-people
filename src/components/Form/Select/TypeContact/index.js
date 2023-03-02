import React from "react";

const SelectTypeContact = (props) => {
  return(
    <div className="col-md-4">
      <div className="form-floating">
        <select 
          className="form-select" 
          id="select-type-contact"
          name="select-type-contact"
          value={props.contact.id_contact_type}
          aria-label="Default select example"
        >
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <label for="floatingSelect">Tipo</label>
      </div>
    </div>      
  );
}

export default SelectTypeContact;